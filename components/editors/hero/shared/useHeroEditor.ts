import { useSectionEditor } from "@/hooks/useSectionEditor";

export interface HeroEditorUtils {
  activeSection: ReturnType<typeof useSectionEditor>["activeSection"];
  updateField: (field: string, value: any) => void;
  uploadImage: (file: File, fieldPath: string) => Promise<string>;
  addArrayItem: (key: string, item: any) => void;
  removeArrayItem: (key: string, index: number) => void;
  updateArrayItem: (key: string, index: number, updatedItem: any) => void;
  imageUploadState: {
    isUploading: boolean;
    progress: number;
    error: string | null;
  };
}

/**
 * Custom hook for Hero section editor functionality
 * Abstracts common functionality to be shared between variant editors
 */
export const useHeroEditor = (): HeroEditorUtils => {
  const {
    activeSection,
    updateSectionData,
    uploadImage,
    addArrayItem,
    removeArrayItem,
    updateArrayItem,
    imageUploadState,
  } = useSectionEditor();

  const updateField = (field: string, value: any) => {
    updateSectionData({ [field]: value });
  };

  return {
    activeSection,
    updateField,
    uploadImage,
    addArrayItem,
    removeArrayItem,
    updateArrayItem,
    imageUploadState,
  };
};
