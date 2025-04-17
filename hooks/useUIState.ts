import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SectionType } from "./useEditableSections";

interface UseUIStateReturn {
  isEditSheetOpen: boolean;
  isAddSectionSheetOpen: boolean;
  selectedTabIndex: number;
  afterSectionId: string | null;
  closeAllSheets: () => void;
  openEditSheet: (sectionId: string) => void;
  openAddSectionSheet: (afterSectionId: string) => void;
  setSelectedTabIndex: (index: number) => void;
  activeComponentsList: Array<{ type: SectionType; templates: string[] }>;
}

export const useUIState = (): UseUIStateReturn => {
  const dispatch = useDispatch();
  const isEditSheetOpen = useSelector((state: any) => state.ui.isEditSheetOpen);
  const isAddSectionSheetOpen = useSelector(
    (state: any) => state.ui.isAddSectionSheetOpen
  );
  const selectedTabIndex = useSelector(
    (state: any) => state.ui.selectedTabIndex
  );
  const afterSectionId = useSelector(
    (state: any) => state.ui.addSectionContext?.afterSectionId
  );

  // This would typically come from a backend or config file
  // For now we hardcode it for demonstration
  const activeComponentsList = [
    {
      type: "navbar" as SectionType,
      templates: ["Default", "Centered", "Transparent"],
    },
    {
      type: "hero" as SectionType,
      templates: ["Default", "Split", "Video Background"],
    },
    {
      type: "about" as SectionType,
      templates: ["Default", "Timeline", "Team"],
    },
    {
      type: "services" as SectionType,
      templates: ["Default", "Grid", "Cards"],
    },
    {
      type: "featuredTours" as SectionType,
      templates: ["Default", "Carousel", "Grid"],
    },
    {
      type: "footer" as SectionType,
      templates: ["Default", "Simple", "Contact Form"],
    },
  ];

  const closeAllSheets = () => {
    dispatch({ type: "ui/closeAllSheets" });
  };

  const openEditSheet = (sectionId: string) => {
    dispatch({ type: "template/setEditingSectionId", payload: sectionId });
    dispatch({ type: "ui/openEditSheet", payload: true });
    dispatch({ type: "ui/setSelectedTabIndex", payload: 0 }); // Default to Edit tab
  };

  const openAddSectionSheet = (afterSectionId: string) => {
    dispatch({
      type: "ui/setAddSectionContext",
      payload: { afterSectionId, showAddSheet: true },
    });
  };

  const setSelectedTabIndex = (index: number) => {
    dispatch({ type: "ui/setSelectedTabIndex", payload: index });
  };

  return {
    isEditSheetOpen,
    isAddSectionSheetOpen,
    selectedTabIndex,
    afterSectionId,
    closeAllSheets,
    openEditSheet,
    openAddSectionSheet,
    setSelectedTabIndex,
    activeComponentsList,
  };
};
