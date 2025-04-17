"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  limit,
  doc,
  getDoc,
} from "firebase/firestore";
import TemplateFactory from "@/components/templates/TemplateFactory";
import { useDispatch } from "react-redux";
import { setTemplate, resetTemplate } from "@/redux/features/templateSlice";

// Import the Section type to ensure type safety
import { Section } from "@/hooks/useEditableSections";

interface SlugPageProps {
  params: {
    slug: string;
  };
}

export default function SlugPage({ params }: SlugPageProps) {
  const { slug } = params;
  const [website, setWebsite] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [templateType, setTemplateType] = useState("travel-tour"); // Default
  const router = useRouter();
  const dispatch = useDispatch();

  // Define fetchWebsite as a callback to enable refreshing
  const fetchWebsite = useCallback(async () => {
    try {
      setLoading(true);
      // Query Firestore for the website with this slug
      const websitesRef = collection(db, "websites");
      const q = query(
        websitesRef,
        where("slug", "==", slug),
        where("isPublished", "==", true),
        limit(1)
      );

      // Add cache-busting timestamp to avoid stale data
      const queryTimestamp = Date.now();
      console.log(`Fetching website at ${queryTimestamp}`);

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("Website not found or not published.");
        setLoading(false);
        return;
      }

      // Get the first (and should be only) document
      const websiteDoc = querySnapshot.docs[0];
      const websiteData = websiteDoc.data();
      console.log("Website data:", websiteData);

      // Get the template type
      const type =
        websiteData.templateType || websiteData.templateId || "travel-tour";
      setTemplateType(type);

      // Load sections from the database
      const websiteId = websiteDoc.id;
      try {
        const sectionsRef = collection(db, `websites/${websiteId}/sections`);
        const sectionsSnapshot = await getDocs(sectionsRef);

        if (!sectionsSnapshot.empty) {
          // Use type assertion to ensure sections have the correct type
          const sections = sectionsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Section[];

          console.log(`Loaded ${sections.length} sections from Firestore`);

          // Set the template data in Redux
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
          // If no sections found, use default template
          console.log("No sections found - using default template");
          dispatch(resetTemplate(type));
        }
      } catch (err) {
        console.error("Error loading sections:", err);
        // Even on error, initialize with a default template
        dispatch(resetTemplate(type));
      }

      setWebsite(websiteData);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching website:", err);
      setError("Failed to load the website. Please try again later.");
      setLoading(false);
    }
  }, [slug, dispatch]);

  useEffect(() => {
    fetchWebsite();
  }, [fetchWebsite]);

  // Add this function to handle forcing a full page reload
  const forceRefresh = () => {
    // Clear any cache by adding a timestamp parameter
    const timestamp = Date.now();
    window.location.href = `${window.location.pathname}?t=${timestamp}`;
  };

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin h-8 w-8 border-t-2 border-b-2 border-primary rounded-full'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='max-w-md p-8 bg-white rounded-lg shadow-md'>
          <h1 className='text-2xl font-bold text-red-500 mb-4'>Error</h1>
          <p className='text-gray-700'>{error}</p>
          <button
            className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            onClick={() => router.push("/")}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Render the template using the TemplateFactory
  if (website) {
    return (
      <>
        <button
          onClick={forceRefresh}
          className='fixed bottom-4 right-4 z-50 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors'
          title='Refresh content'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z'
              clipRule='evenodd'
            />
          </svg>
        </button>
        <TemplateFactory templateType={templateType} previewMode={true} />
      </>
    );
  }

  return null;
}
