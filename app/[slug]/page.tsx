"use client";

import { useState, useEffect } from "react";
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
import TravelTourTemplate from "@/components/templates/TravelTourTemplate";
import { useDispatch } from "react-redux";
import { setTemplate } from "@/redux/features/templateSlice"; // Using setTemplate instead of non-existent loadSections

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
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchWebsite = async () => {
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

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setError("Website not found or not published.");
          setLoading(false);
          return;
        }

        // Get the first (and should be only) document
        const websiteDoc = querySnapshot.docs[0];
        const websiteData = websiteDoc.data();

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

            // Set the template data in Redux
            dispatch(
              setTemplate({
                id: websiteId,
                name: websiteData.name || "Website",
                sections: sections,
                editingSectionId: null,
                lastUpdated: new Date().toISOString(),
              })
            );
          } else {
            // If no sections found, use default template
            console.log("No sections found - using default template");
          }
        } catch (err) {
          console.error("Error loading sections:", err);
        }

        setWebsite(websiteData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching website:", err);
        setError("Failed to load the website. Please try again later.");
        setLoading(false);
      }
    };

    fetchWebsite();
  }, [slug, dispatch]);

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

  // Render the appropriate template based on the templateId
  if (website) {
    switch (website.templateId) {
      case "travel-tour":
        return <TravelTourTemplate previewMode={false} />;
      default:
        return (
          <div className='min-h-screen flex items-center justify-center'>
            <div className='max-w-md p-8 bg-white rounded-lg shadow-md'>
              <h1 className='text-2xl font-bold mb-4'>Unknown Template</h1>
              <p className='text-gray-700'>
                The template for this website is not recognized.
              </p>
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
  }

  return null;
}
