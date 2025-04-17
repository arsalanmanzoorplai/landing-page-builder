"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDispatch } from "react-redux";
import { resetTemplate } from "@/redux/features/templateSlice";

// Available templates
const AVAILABLE_TEMPLATES = [
  {
    id: "travel-tour",
    name: "Travel Tour",
    description: "Perfect for travel agencies and tour operators",
    image: "/images/templates/travel-tour.jpg",
  },
  // Add more templates here in the future
];

interface Website {
  id: string;
  name: string;
  description?: string;
  slug: string;
  templateId: string;
  createdAt: Date;
  updatedAt: Date;
  isPublished: boolean;
  userId: string;
}

export default function DashboardPage() {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [websiteToDelete, setWebsiteToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        loadUserWebsites(currentUser.uid);
      } else {
        router.push("/auth");
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Add a new effect to reload websites when the component is focused
  useEffect(() => {
    // This will run when the window regains focus (e.g., when returning from editor)
    const handleFocus = () => {
      if (user) {
        console.log("Window focused, reloading websites");
        loadUserWebsites(user.uid);
      }
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [user]);

  const loadUserWebsites = async (userId: string) => {
    try {
      setLoading(true);
      const websitesRef = collection(db, "websites");
      const q = query(websitesRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      const websitesList: Website[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        websitesList.push({
          id: doc.id,
          name: data.name,
          description: data.description,
          slug: data.slug,
          templateId: data.templateId,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate(),
          isPublished: data.isPublished === true, // Ensure boolean value
          userId: data.userId,
        });
      });

      console.log("Loaded websites:", websitesList);
      setWebsites(websitesList);
    } catch (error) {
      console.error("Error loading websites:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleCreateWebsite = (templateId: string) => {
    dispatch(resetTemplate(templateId));
    router.push(`/website-editor?template=${templateId}`);
  };

  const handleEditWebsite = (websiteId: string) => {
    router.push(`/editor?id=${websiteId}`);
  };

  const handleViewWebsite = (slug: string) => {
    window.open(`/${slug}`, "_blank");
  };

  const handleDeleteWebsite = async (
    websiteId: string,
    websiteName: string
  ) => {
    // Open dialog and set website to delete
    setWebsiteToDelete({ id: websiteId, name: websiteName });
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!websiteToDelete) return;

    try {
      setLoading(true);

      // Delete the website document
      await deleteDoc(doc(db, "websites", websiteToDelete.id));

      // Delete all sections for this website
      const sectionsRef = collection(
        db,
        `websites/${websiteToDelete.id}/sections`
      );
      const sectionsSnapshot = await getDocs(sectionsRef);

      const deletePromises = sectionsSnapshot.docs.map((docSnap) =>
        deleteDoc(docSnap.ref)
      );

      await Promise.all(deletePromises);

      // Update the UI by removing the deleted website
      setWebsites(
        websites.filter((website) => website.id !== websiteToDelete.id)
      );

      // Close the dialog
      setIsDeleteDialogOpen(false);
      setWebsiteToDelete(null);

      alert("Website deleted successfully");
    } catch (error) {
      console.error("Error deleting website:", error);
      alert("Failed to delete website. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !user) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin h-8 w-8 border-t-2 border-b-2 border-primary rounded-full'></div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <header className='bg-white shadow'>
        <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center'>
          <h1 className='text-3xl font-bold text-gray-900'>Dashboard</h1>
          <div className='flex items-center'>
            <span className='mr-4 text-gray-700'>{user?.email}</span>
            <Button variant='outline' onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
        <Tabs defaultValue='websites' className='w-full'>
          <TabsList className='mb-6'>
            <TabsTrigger value='websites'>My Websites</TabsTrigger>
            <TabsTrigger value='templates'>Templates</TabsTrigger>
          </TabsList>

          <TabsContent value='websites'>
            {loading ? (
              <div className='text-center py-12'>
                <div className='inline-block animate-spin h-8 w-8 border-t-2 border-b-2 border-primary rounded-full mr-3'></div>
                <span>Loading your websites...</span>
              </div>
            ) : websites.length === 0 ? (
              <div className='text-center py-12'>
                <h2 className='text-xl font-medium mb-2'>
                  You haven't created any websites yet
                </h2>
                <p className='text-gray-500 mb-6'>
                  Select a template to get started
                </p>
                <Button
                  onClick={() =>
                    document
                      .querySelector('[value="templates"]')
                      ?.dispatchEvent(new Event("click"))
                  }
                >
                  Browse Templates
                </Button>
              </div>
            ) : (
              <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                {websites.map((website) => (
                  <Card key={website.id}>
                    <CardHeader>
                      <CardTitle>{website.name}</CardTitle>
                      <CardDescription>
                        {website.isPublished ? "Published" : "Draft"} • Last
                        updated: {website.updatedAt?.toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className='text-gray-500'>
                        {website.description || "No description"}
                      </p>
                    </CardContent>
                    <CardFooter className='flex justify-between'>
                      <div className='flex space-x-2'>
                        <Button
                          variant='outline'
                          onClick={() => handleEditWebsite(website.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant='destructive'
                          onClick={() =>
                            handleDeleteWebsite(website.id, website.name)
                          }
                        >
                          Delete
                        </Button>
                      </div>
                      {website.isPublished && (
                        <Button
                          variant='outline'
                          onClick={() => handleViewWebsite(website.slug)}
                        >
                          View
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value='templates'>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {AVAILABLE_TEMPLATES.map((template) => (
                <Card key={template.id} className='overflow-hidden'>
                  <div className='h-48 bg-gray-200'>
                    {template.image ? (
                      <img
                        src={template.image}
                        alt={template.name}
                        className='w-full h-full object-cover'
                      />
                    ) : (
                      <div className='w-full h-full flex items-center justify-center text-gray-400'>
                        No preview available
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle>{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button
                      className='w-full'
                      onClick={() => handleCreateWebsite(template.id)}
                    >
                      Use this template
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Delete confirmation dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the website
              <span className='font-semibold mx-1'>
                "{websiteToDelete?.name}"
              </span>
              and all of its content. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className='bg-red-600 hover:bg-red-700'
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
