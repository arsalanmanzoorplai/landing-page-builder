import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ***** AppState *****
export interface AppState {}

// ***** initialState *****
const initialState: AppState = {};

// ***** appSlice *****
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
});

// ***** actions *****
export const {} = appSlice.actions;

// ***** appReducer *****
export default appSlice.reducer;
