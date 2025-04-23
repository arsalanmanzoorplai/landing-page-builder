"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  collection,
} from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TemplateSelector, {
  TemplateOption,
} from "@/components/ui/TemplateSelector";
import { useDispatch } from "react-redux";
import { resetTemplate } from "@/redux/features/templateSlice";

// Define available templates
const AVAILABLE_TEMPLATES: TemplateOption[] = [
  {
    id: "travel-tour",
    name: "Travel & Tourism",
    description:
      "Perfect for travel agencies, tour operators, and destination websites",
    thumbnail: "/templates/travel-tour-thumbnail.jpg",
  },
  // Add more templates as needed
  // {
  //   id: "ecommerce",
  //   name: "E-Commerce",
  //   description: "Showcase your products with a modern online store",
  //   thumbnail: "/templates/ecommerce-thumbnail.jpg",
  // },
  // {
  //   id: "portfolio",
  //   name: "Portfolio",
  //   description: "Highlight your work and skills with an elegant portfolio",
  //   thumbnail: "/templates/portfolio-thumbnail.jpg",
  // },
];

export default function WebsiteEditorPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [user, setUser] = useState<any>(null);
  const [websiteId, setWebsiteId] = useState<string | null>(null);
  const [templateType, setTemplateType] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser) {
        router.push("/auth");
        return;
      }

      setUser(currentUser);

      const id = searchParams.get("id");
      const template = searchParams.get("template");

      if (id) {
        // Editing existing website
        setWebsiteId(id);
        await loadWebsite(id);
      } else if (template) {
        // Creating new website from template
        setTemplateType(template);
        setLoading(false);
      } else {
        // New website without template preselected
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router, searchParams]);

  const loadWebsite = async (id: string) => {
    try {
      const websiteRef = doc(db, "websites", id);
      const websiteSnap = await getDoc(websiteRef);

      if (websiteSnap.exists()) {
        const data = websiteSnap.data();
        setName(data.name || "");
        setDescription(data.description || "");
        setSlug(data.slug || "");
        // Support both new templateType and legacy templateId
        setTemplateType(data.templateType || data.templateId || null);
      } else {
        setError("Website not found");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error loading website:", error);
      setError("Failed to load website");
      setLoading(false);
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);

    if (!websiteId || (websiteId && slug === generateSlug(name))) {
      // Only auto-update slug if it's a new site or hasn't been manually changed
      setSlug(generateSlug(newName));
    }
  };

  const handleSave = async () => {
    if (!name || !slug || !templateType || !user) {
      setError("Please fill in all required fields");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const websiteData = {
        name,
        description,
        slug,
        templateType, // Use the new field name
        templateId: templateType, // Keep for backward compatibility
        userId: user.uid,
        updatedAt: serverTimestamp(),
        isPublished: false,
      };

      let docId = websiteId;

      if (websiteId) {
        // Update existing website
        const websiteRef = doc(db, "websites", websiteId);
        await updateDoc(websiteRef, websiteData);
      } else {
        // Create new website
        const websitesCollection = collection(db, "websites");
        const newWebsiteRef = doc(websitesCollection);
        await setDoc(newWebsiteRef, {
          ...websiteData,
          createdAt: serverTimestamp(),
        });
        docId = newWebsiteRef.id;
        setWebsiteId(docId);
      }

      router.push("/editor?id=" + docId);
    } catch (error) {
      console.error("Error saving website:", error);
      setError("Failed to save website");
      setSaving(false);
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    setTemplateType(templateId);
    dispatch(
      resetTemplate({
        type: templateId,
        name: name || undefined,
      })
    );
  };

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin h-8 w-8 border-t-2 border-b-2 border-primary rounded-full'></div>
      </div>
    );
  }

  if (error && !name && !templateType) {
    return (
      <div className='min-h-screen flex items-center justify-center p-4'>
        <Card className='w-full max-w-md'>
          <CardHeader>
            <CardTitle className='text-red-500'>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push("/dashboard")}>
              Back to Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 p-4'>
      <Card className='w-full max-w-xl'>
        <CardHeader>
          <CardTitle>
            {websiteId ? "Edit Website" : "Create New Website"}
          </CardTitle>
          <CardDescription>
            {websiteId
              ? "Update your website details"
              : "Enter details for your new website"}
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          {error && <p className='text-red-500 text-sm'>{error}</p>}

          <div className='space-y-2'>
            <Label htmlFor='name'>Website Name</Label>
            <Input
              id='name'
              value={name}
              onChange={handleNameChange}
              placeholder='My Travel Website'
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='description'>Description (optional)</Label>
            <Input
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='A brief description of your website'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='slug'>URL Slug</Label>
            <div className='flex items-center space-x-2'>
              <span className='text-gray-500 shrink-0'>
                https://landing-site/
              </span>
              <Input
                id='slug'
                value={slug}
                onChange={(e) => setSlug(generateSlug(e.target.value))}
                placeholder='my-website'
                required
              />
            </div>
            <p className='text-xs text-gray-500'>
              This will be the URL of your published website
            </p>
          </div>

          {/* Template Selection */}
          <TemplateSelector
            templates={AVAILABLE_TEMPLATES}
            selectedTemplateId={templateType}
            onSelect={handleTemplateSelect}
          />
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button variant='outline' onClick={() => router.push("/dashboard")}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Continue to Editor"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
