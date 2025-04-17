import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";

// Define types for section data
export type SectionType =
  | "navbar"
  | "hero"
  | "about"
  | "services"
  | "featuredTours"
  | "footer";

export interface Section {
  id: string;
  type: SectionType;
  order: number;
  data: Record<string, any>;
}

interface UseEditableSectionsReturn {
  hoveredSection: string | null;
  setHoveredSection: (id: string | null) => void;
  handleEditSection: (sectionId: string) => void;
  handleDeleteSection: (sectionId: string) => void;
  handleAddSection: (sectionType: SectionType, afterSectionId: string) => void;
}

export const useEditableSections = (): UseEditableSectionsReturn => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleEditSection = (sectionId: string) => {
    dispatch({ type: "template/setEditingSectionId", payload: sectionId });
    dispatch({ type: "ui/openEditSheet", payload: true });
  };

  const handleDeleteSection = (sectionId: string) => {
    dispatch({ type: "template/deleteSection", payload: sectionId });
  };

  const handleAddSection = (
    sectionType: SectionType,
    afterSectionId: string
  ) => {
    dispatch({
      type: "ui/setAddSectionContext",
      payload: { afterSectionId, showAddSheet: true },
    });
  };

  return {
    hoveredSection,
    setHoveredSection,
    handleEditSection,
    handleDeleteSection,
    handleAddSection,
  };
};
