import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AddSectionContext {
  afterSectionId: string;
  showAddSheet: boolean;
}

interface UIState {
  isEditSheetOpen: boolean;
  isAddSectionSheetOpen: boolean;
  selectedTabIndex: number; // 0 = Edit, 1 = Templates
  addSectionContext: AddSectionContext | null;
  isDragging: boolean;
  hoveredSectionId: string | null;
  previewMode: boolean;
}

const initialState: UIState = {
  isEditSheetOpen: false,
  isAddSectionSheetOpen: false,
  selectedTabIndex: 0,
  addSectionContext: null,
  isDragging: false,
  hoveredSectionId: null,
  previewMode: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openEditSheet: (state, action: PayloadAction<boolean>) => {
      state.isEditSheetOpen = action.payload;

      // If opening the edit sheet, we should close the add section sheet
      if (action.payload) {
        state.isAddSectionSheetOpen = false;
        state.addSectionContext = null;
      }
    },

    setAddSectionContext: (state, action: PayloadAction<AddSectionContext>) => {
      state.addSectionContext = action.payload;
      state.isAddSectionSheetOpen = action.payload.showAddSheet;

      // If opening the add section sheet, we should close the edit sheet
      if (action.payload.showAddSheet) {
        state.isEditSheetOpen = false;
      }
    },

    closeAllSheets: (state) => {
      state.isEditSheetOpen = false;
      state.isAddSectionSheetOpen = false;
      state.addSectionContext = null;
    },

    setSelectedTabIndex: (state, action: PayloadAction<number>) => {
      state.selectedTabIndex = action.payload;
    },

    setIsDragging: (state, action: PayloadAction<boolean>) => {
      state.isDragging = action.payload;
    },

    setHoveredSectionId: (state, action: PayloadAction<string | null>) => {
      state.hoveredSectionId = action.payload;
    },

    setPreviewMode: (state, action: PayloadAction<boolean>) => {
      state.previewMode = action.payload;

      // In preview mode, all sheets should be closed
      if (action.payload) {
        state.isEditSheetOpen = false;
        state.isAddSectionSheetOpen = false;
        state.addSectionContext = null;
      }
    },
  },
});

export const {
  openEditSheet,
  setAddSectionContext,
  closeAllSheets,
  setSelectedTabIndex,
  setIsDragging,
  setHoveredSectionId,
  setPreviewMode,
} = uiSlice.actions;

export default uiSlice.reducer;
