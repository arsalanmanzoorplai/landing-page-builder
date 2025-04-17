"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
  collection,
  getDocs,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TemplateFactory from "@/components/templates/TemplateFactory";
import { useDispatch, useSelector } from "react-redux";
import {
  resetTemplate,
  setTemplate,
  setTemplateName,
} from "@/redux/features/templateSlice";
import { Section } from "@/hooks/useEditableSections";

export default function EditorPage() {
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [website, setWebsite] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [templateType, setTemplateType] = useState("travel-tour");

  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  // Access template state at the component level
  const templateState = useSelector((state: any) => state.template);

  // Add state for website name editing
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState("");

  // Add this useEffect to initialize the name input when website loads
  useEffect(() => {
    if (website && templateState) {
      setNameInput(templateState.name || website.name || "");
    }
  }, [website, templateState]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        router.push("/auth");
        return;
      }

      const websiteId = searchParams.get("id");

      if (!websiteId) {
        setError("No website ID provided");
        setLoading(false);
        return;
      }

      await loadWebsite(websiteId);
    });

    return () => unsubscribe();
  }, [router, searchParams]);

  const loadWebsite = async (websiteId: string) => {
    try {
      const websiteRef = doc(db, "websites", websiteId);
      const websiteSnap = await getDoc(websiteRef);

      if (!websiteSnap.exists()) {
        setError("Website not found");
        setLoading(false);
        return;
      }

      const websiteData = websiteSnap.data();
      setWebsite(websiteData);

      // Determine template type from either templateType or legacy templateId field
      const type =
        websiteData.templateType || websiteData.templateId || "travel-tour";
      setTemplateType(type);

      // Check if there are existing sections for this website
      const sectionsRef = collection(db, `websites/${websiteId}/sections`);
      const sectionsSnapshot = await getDocs(sectionsRef);

      if (!sectionsSnapshot.empty) {
        // If there are saved sections, load them
        const sections = sectionsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Section[];

        // Set the template data in Redux with existing sections
        dispatch(
          setTemplate({
            id: websiteId,
            name: websiteData.name || "Website",
            templateType: type,
            sections: sections,
            editingSectionId: null,
            lastUpdated: new Date().toISOString(),
          })
        );
      } else {
        // If no sections found (new website), initialize with fresh template
        // Pass both type and name to ensure the name is preserved
        dispatch(
          resetTemplate({
            type: type,
            name: websiteData.name,
          })
        );
      }

      setLoading(false);
    } catch (error) {
      console.error("Error loading website:", error);
      setError("Failed to load website");
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!website) return false;

    try {
      setSuccess(null);
      setError(null);

      const websiteId = searchParams.get("id") as string;
      const websiteRef = doc(db, "websites", websiteId);

      // Use templateState from component scope
      const sections = templateState.sections;

      // First update the website document with basic info
      await updateDoc(websiteRef, {
        updatedAt: serverTimestamp(),
        name: templateState.name || website.name,
      });

      // Then save all the sections to Firestore
      const sectionsRef = collection(db, `websites/${websiteId}/sections`);

      // Get existing sections to compare
      const existingSectionsSnapshot = await getDocs(sectionsRef);
      const existingSectionIds = new Set(
        existingSectionsSnapshot.docs.map((doc) => doc.id)
      );

      // First delete sections that no longer exist
      const currentSectionIds = new Set(
        sections.map((section: Section) => section.id)
      );

      const deletePromises = [];
      for (const sectionId of existingSectionIds) {
        if (!currentSectionIds.has(sectionId)) {
          deletePromises.push(
            deleteDoc(doc(db, `websites/${websiteId}/sections/${sectionId}`))
          );
        }
      }

      // Delete old sections first
      await Promise.all(deletePromises);

      // Then save all current sections
      const savePromises = sections.map((section: Section) =>
        setDoc(doc(db, `websites/${websiteId}/sections/${section.id}`), {
          type: section.type,
          order: section.order,
          data: section.data,
        })
      );

      // Wait for all sections to be saved
      await Promise.all(savePromises);

      console.log(
        `Successfully saved ${sections.length} sections to Firestore`
      );
      setSuccess("Website saved successfully!");

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);

      return true;
    } catch (error: any) {
      console.error("Error saving website:", error);
      setError(`Failed to save website: ${error.message}`);
      return false;
    }
  };

  const handlePublish = async () => {
    if (!website) return;

    try {
      setPublishing(true);
      setSuccess(null);
      setError(null);

      // First save the website sections
      const saveSuccess = await handleSave();

      if (!saveSuccess) {
        setPublishing(false);
        return;
      }

      const websiteId = searchParams.get("id") as string;
      const websiteRef = doc(db, "websites", websiteId);

      // No need to update the name here - it's already saved in handleSave
      await updateDoc(websiteRef, {
        isPublished: true,
        updatedAt: serverTimestamp(),
        lastPublishedAt: serverTimestamp(),
      });

      setWebsite({
        ...website,
        isPublished: true,
      });

      setSuccess(
        "Website published successfully! It is now available at /" +
          website.slug
      );
      setPublishing(false);
    } catch (error: any) {
      console.error("Error publishing website:", error);
      setError(`Failed to publish website: ${error.message}`);
      setPublishing(false);
    }
  };

  const handleBack = () => {
    router.push("/dashboard");
  };

  const handleSaveName = () => {
    if (nameInput.trim()) {
      // Update the name in Redux
      dispatch(setTemplateName(nameInput.trim()));
      setIsEditingName(false);

      // Save the name to Firestore immediately to ensure it's not lost
      const websiteId = searchParams.get("id") as string;
      const websiteRef = doc(db, "websites", websiteId);
      updateDoc(websiteRef, {
        name: nameInput.trim(),
        updatedAt: serverTimestamp(),
      }).catch((error) => {
        console.error("Error updating website name:", error);
      });
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin h-8 w-8 border-t-2 border-b-2 border-primary rounded-full'></div>
      </div>
    );
  }

  if (error && !website) {
    return (
      <div className='min-h-screen flex items-center justify-center p-4'>
        <div className='max-w-md w-full p-6 bg-white rounded-lg shadow-md'>
          <h1 className='text-2xl font-bold text-red-500 mb-4'>Error</h1>
          <p className='mb-6'>{error}</p>
          <Button onClick={handleBack}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className='relative pb-0'>
      <header className='sticky top-0 z-[100] bg-white border-b shadow-sm py-4'>
        <div className='container mx-auto px-4 flex justify-between items-center'>
          <div className='flex items-center'>
            {isEditingName ? (
              <div className='flex items-center'>
                <Input
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className='w-64 mr-2'
                  placeholder='Website Name'
                  autoFocus
                />
                <Button size='sm' onClick={handleSaveName}>
                  Save
                </Button>
                <Button
                  size='sm'
                  variant='ghost'
                  onClick={() => {
                    setNameInput(templateState.name || website.name || "");
                    setIsEditingName(false);
                  }}
                  className='ml-1'
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <h1
                className='text-xl font-semibold mr-6 cursor-pointer hover:underline'
                onClick={() => setIsEditingName(true)}
                title='Click to edit website name'
              >
                {templateState.name || website.name || "Unnamed Website"}
              </h1>
            )}
            {website.isPublished && (
              <span className='px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full'>
                Published
              </span>
            )}
          </div>

          <div className='flex space-x-3'>
            {success && (
              <div className='px-3 py-2 bg-green-100 text-green-800 rounded-md'>
                {success}
              </div>
            )}
            {error && (
              <div className='px-3 py-2 bg-red-100 text-red-800 rounded-md'>
                {error}
              </div>
            )}

            <Button variant='outline' onClick={handleBack}>
              Back
            </Button>

            <Button onClick={handleSave}>Save</Button>

            {!website.isPublished && (
              <Button
                className='bg-green-600 hover:bg-green-700'
                onClick={handlePublish}
                disabled={publishing}
              >
                {publishing ? "Publishing..." : "Publish"}
              </Button>
            )}

            {website.isPublished && (
              <Button
                variant='outline'
                onClick={() => window.open(`/${website.slug}`, "_blank")}
              >
                View Live
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className='pb-0'>
        <TemplateFactory templateType={templateType} previewMode={false} />
      </main>
    </div>
  );
}
