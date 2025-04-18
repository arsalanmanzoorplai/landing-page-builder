import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Section, SectionType } from "./useEditableSections";

interface ImageUploadState {
  isUploading: boolean;
  progress: number;
  error: string | null;
}

export interface NavbarData {
  logo: string;
  tabLogo: string;
  title: string;
  links: Array<{ text: string; url: string }>;
  socialLinks: Array<{ icon: string; url: string }>;
  backgroundColor: string;
}

export interface HeroData {
  backgroundImage: string;
  backgroundOpacity: number;
  title: string;
  subtitle: string;
  paragraphs: string[];
  ctaText?: string;
  ctaLink?: string;
  // For backward compatibility
  ctaButtons?: Array<{
    text: string;
    url: string;
    variant: string;
  }>;
}

export interface AboutData {
  image: string;
  title: string;
  paragraphs: string[];
  backgroundColor: string;
}

export interface ServiceData {
  icon: string;
  title: string;
  description: string;
}

export interface ServicesData {
  backgroundImage: string;
  title: string;
  subtitle: string;
  services: ServiceData[];
  backgroundColor: string;
}

export interface TourData {
  image: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  url: string;
}

export interface FeaturedToursData {
  title: string;
  subtitle: string;
  tours: TourData[];
  backgroundColor: string;
}

export interface FooterData {
  backgroundColor: string;
  logo: string;
  links: Array<{ title: string; items: Array<{ text: string; url: string }> }>;
  socialLinks: Array<{ icon: string; url: string }>;
  copyright: string;
}

type SectionDataTypes =
  | NavbarData
  | HeroData
  | AboutData
  | ServicesData
  | FeaturedToursData
  | FooterData;

interface UseSectionEditorReturn {
  activeSection: Section | null;
  updateSectionData: <T extends SectionDataTypes>(data: Partial<T>) => void;
  uploadImage: (file: File, fieldPath: string) => Promise<string>;
  addArrayItem: (arrayPath: string, item: any) => void;
  removeArrayItem: (arrayPath: string, index: number) => void;
  updateArrayItem: (arrayPath: string, index: number, item: any) => void;
  imageUploadState: ImageUploadState;
}

export const useSectionEditor = (): UseSectionEditorReturn => {
  const dispatch = useDispatch();
  const editingSectionId = useSelector(
    (state: any) => state.template.editingSectionId
  );
  const sections = useSelector((state: any) => state.template.sections);
  const activeSection =
    sections.find((section: Section) => section.id === editingSectionId) ||
    null;

  const [imageUploadState, setImageUploadState] = useState<ImageUploadState>({
    isUploading: false,
    progress: 0,
    error: null,
  });

  const updateSectionData = <T extends SectionDataTypes>(data: Partial<T>) => {
    if (!activeSection) return;

    dispatch({
      type: "template/updateSectionData",
      payload: {
        sectionId: activeSection.id,
        data,
      },
    });
  };

  const uploadImage = async (
    file: File,
    fieldPath: string
  ): Promise<string> => {
    if (!activeSection) throw new Error("No active section");

    setImageUploadState({
      isUploading: true,
      progress: 0,
      error: null,
    });

    try {
      // Create a data URL from the file for immediate display
      const imageUrl = await readFileAsDataURL(file);

      return new Promise<string>((resolve) => {
        const interval = setInterval(() => {
          setImageUploadState((prev) => {
            const newProgress = Math.min(prev.progress + 10, 100);
            if (newProgress === 100) {
              clearInterval(interval);
              // Simulate a delay for completing the upload
              setTimeout(() => {
                // Update the image URL in the section data with the actual data URL
                updateSectionData<SectionDataTypes>({
                  [fieldPath]: imageUrl,
                } as Partial<SectionDataTypes>);
                setImageUploadState({
                  isUploading: false,
                  progress: 0,
                  error: null,
                });
                resolve(imageUrl);
              }, 500);
            }
            return {
              ...prev,
              progress: newProgress,
            };
          });
        }, 200);
      });
    } catch (err) {
      setImageUploadState({
        isUploading: false,
        progress: 0,
        error: err instanceof Error ? err.message : "Failed to upload image",
      });
      throw err;
    }
  };

  // Helper function to read a file as a data URL
  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const addArrayItem = (arrayPath: string, item: any) => {
    if (!activeSection) return;

    const currentArray = getNestedValue(activeSection.data, arrayPath) || [];
    const newArray = [...currentArray, item];

    updateSectionData<SectionDataTypes>({
      [arrayPath]: newArray,
    } as Partial<SectionDataTypes>);
  };

  const removeArrayItem = (arrayPath: string, index: number) => {
    if (!activeSection) return;

    const currentArray = getNestedValue(activeSection.data, arrayPath) || [];
    const newArray = currentArray.filter((_: any, i: number) => i !== index);

    updateSectionData<SectionDataTypes>({
      [arrayPath]: newArray,
    } as Partial<SectionDataTypes>);
  };

  const updateArrayItem = (arrayPath: string, index: number, item: any) => {
    if (!activeSection) return;

    const currentArray = getNestedValue(activeSection.data, arrayPath) || [];
    const newArray = [...currentArray];

    // Check if we're dealing with a simple string update to an object
    if (
      typeof item === "string" &&
      typeof newArray[index] === "object" &&
      newArray[index] !== null
    ) {
      // For paragraph objects with numeric keys (character by character)
      if (isStringObject(newArray[index])) {
        // Convert string to object with numeric keys
        const stringObj: Record<string, string> = {};
        for (let i = 0; i < item.length; i++) {
          stringObj[i.toString()] = item[i];
        }
        newArray[index] = stringObj;
      }
      // If it has a text or content property, update that instead of replacing the whole object
      else if ("text" in newArray[index]) {
        newArray[index] = { ...newArray[index], text: item };
      } else if ("content" in newArray[index]) {
        newArray[index] = { ...newArray[index], content: item };
      } else {
        // Default: replace with string value
        newArray[index] = item;
      }
    } else if (typeof item === "object" && item !== null) {
      newArray[index] = { ...newArray[index], ...item };
    } else {
      newArray[index] = item;
    }

    updateSectionData<SectionDataTypes>({
      [arrayPath]: newArray,
    } as Partial<SectionDataTypes>);
  };

  // Helper function to check if an object is a string-like object with numeric keys
  const isStringObject = (obj: any): boolean => {
    if (!obj || typeof obj !== "object") return false;

    // Check if the object has numeric keys starting from 0
    const keys = Object.keys(obj);
    if (keys.length === 0) return false;

    // Check if all keys are sequential numbers
    for (let i = 0; i < keys.length; i++) {
      if (!obj.hasOwnProperty(i.toString())) {
        return false;
      }
      // Check if values are single characters
      if (
        typeof obj[i.toString()] !== "string" ||
        obj[i.toString()].length !== 1
      ) {
        return false;
      }
    }

    return true;
  };

  // Helper function to get nested value from an object using a path string (e.g., "links.social")
  const getNestedValue = (obj: any, path: string) => {
    return path.split(".").reduce((prev, curr) => {
      return prev && prev[curr] !== undefined ? prev[curr] : undefined;
    }, obj);
  };

  return {
    activeSection,
    updateSectionData,
    uploadImage,
    addArrayItem,
    removeArrayItem,
    updateArrayItem,
    imageUploadState,
  };
};
