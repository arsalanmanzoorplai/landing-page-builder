"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import TravelTourTemplate from "@/components/templates/TravelTourTemplate";

export default function EditorPage() {
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [website, setWebsite] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

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
      setLoading(false);
    } catch (error) {
      console.error("Error loading website:", error);
      setError("Failed to load website");
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!website) return;

    try {
      setSuccess(null);

      const websiteRef = doc(db, "websites", searchParams.get("id") as string);
      await updateDoc(websiteRef, {
        updatedAt: serverTimestamp(),
      });

      setSuccess("Website saved successfully!");

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (error) {
      console.error("Error saving website:", error);
      setError("Failed to save website");
    }
  };

  const handlePublish = async () => {
    if (!website) return;

    try {
      setPublishing(true);
      setSuccess(null);
      setError(null);

      const websiteId = searchParams.get("id") as string;
      const websiteRef = doc(db, "websites", websiteId);

      await updateDoc(websiteRef, {
        isPublished: true,
        updatedAt: serverTimestamp(),
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
    } catch (error) {
      console.error("Error publishing website:", error);
      setError("Failed to publish website");
      setPublishing(false);
    }
  };

  const handleBack = () => {
    router.push("/dashboard");
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
    <div className='relative pb-20'>
      <header className='sticky top-0 z-50 bg-white border-b shadow-sm py-4'>
        <div className='container mx-auto px-4 flex justify-between items-center'>
          <div className='flex items-center'>
            <h1 className='text-xl font-semibold mr-6'>{website.name}</h1>
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

      <main>
        <TravelTourTemplate previewMode={true} />
      </main>
    </div>
  );
}
