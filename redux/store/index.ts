import { configureStore } from "@reduxjs/toolkit";
import templateReducer from "../features/templateSlice";
import uiReducer from "../features/uiSlice";

export const store = configureStore({
  reducer: {
    template: templateReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for Date objects
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
