import { Metadata } from "next";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import ClientSideWrapper from "@/components/ClientSideWrapper";
import { Section } from "@/hooks/useEditableSections";

interface IProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata for the page
// ***** Generating Dynamic Meta data *****
export async function generateMetadata(props: IProps): Promise<Metadata> {
  // ***** props *****
  const { params } = props;
  const { slug } = await params;

  try {
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
      return {
        title: "Website Not Found",
        description:
          "The requested website could not be found or is not published.",
      };
    }

    // Get website data for metadata
    const websiteData = querySnapshot.docs[0].data();
    const websiteId = querySnapshot.docs[0].id;

    // Try to get the favicon from navbar section if it exists
    let favicon = "/images/travel-tour-img/favicon.ico"; // Default favicon

    // First check if info field exists
    if (websiteData.info) {
      // Define type for section to avoid lint errors
      interface SectionData {
        type: string;
        data?: {
          tabLogo?: string;
          [key: string]: any;
        };
      }

      // Find navbar section in the info field
      const navbarSection = Object.values(websiteData.info).find(
        (section: any) => section.type === "navbar"
      ) as SectionData | undefined;

      if (navbarSection?.data?.tabLogo) {
        favicon = navbarSection.data.tabLogo;
      }
    } else {
      // Fallback to legacy subcollection
      try {
        const sectionsRef = collection(db, `websites/${websiteId}/sections`);
        const sectionsSnapshot = await getDocs(sectionsRef);

        // Find the navbar section which contains our tabLogo
        const navbarSection = sectionsSnapshot.docs
          .map((doc) => ({ ...doc.data() }))
          .find((section) => section.type === "navbar");

        if (navbarSection && navbarSection.data && navbarSection.data.tabLogo) {
          favicon = navbarSection.data.tabLogo;
        }
      } catch (error) {
        console.error("Error fetching favicon:", error);
      }
    }

    console.log("websiteData", websiteData);

    return {
      title: websiteData.name || "Website",
      description: websiteData.description || "",
      icons: {
        icon: favicon,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Website",
      description: "",
    };
  }
}

export default async function SlugPage(props: IProps) {
  const { params } = props;
  const { slug } = await params;
  let website = null;
  let websiteId = "";
  let templateType = "travel-tour"; // Default
  let sections: Section[] = [];
  let error = null;

  try {
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
      error = "Website not found or not published.";
    } else {
      // Get the website document
      const websiteDoc = querySnapshot.docs[0];
      const websiteData = websiteDoc.data();
      website = websiteData;
      websiteId = websiteDoc.id;

      // Get the template type
      templateType =
        websiteData.templateType || websiteData.templateId || "travel-tour";

      // Load sections from the info field
      if (websiteData.info) {
        // Define interface for section data
        interface SectionInfo {
          type: string;
          order: number;
          data?: {
            [key: string]: any;
          };
        }

        sections = Object.entries(websiteData.info).map(
          ([id, sectionData]: [string, any]) => ({
            id,
            type: sectionData.type,
            order: sectionData.order,
            data: sectionData.data || {},
          })
        ) as Section[];

        // Sort sections by order
        sections.sort((a, b) => (a.order || 0) - (b.order || 0));
      } else {
        // Fallback to legacy subcollection if info doesn't exist
        const sectionsRef = collection(db, `websites/${websiteId}/sections`);
        const sectionsSnapshot = await getDocs(sectionsRef);

        if (!sectionsSnapshot.empty) {
          sections = sectionsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Section[];
        }
      }
    }
  } catch (err) {
    console.error("Error fetching website:", err);
    error = "Failed to load the website. Please try again later.";
  }

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='max-w-md p-8 bg-white rounded-lg shadow-md'>
          <h1 className='text-2xl font-bold text-red-500 mb-4'>Error</h1>
          <p className='text-gray-700'>{error}</p>
          <a
            className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 inline-block'
            href='/'
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  // Render the template using a client-side wrapper
  if (website) {
    // Pass all data needed for rendering to the client component
    return (
      <ClientSideWrapper
        templateType={templateType}
        sections={sections}
        websiteName={website.name}
        websiteSlug={slug}
        websiteId={websiteId}
      />
    );
  }

  return null;
}
