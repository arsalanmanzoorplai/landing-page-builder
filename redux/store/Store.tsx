// ***** Store *****
import { persistReducer, persistStore } from "redux-persist";
import {
  combineReducers,
  configureStore,
  type ThunkAction,
  type Action,
} from "@reduxjs/toolkit";
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  type TypedUseSelectorHook,
} from "react-redux";
import appReducer from "@/redux/features/app/appSlice";
import templateReducer from "@/redux/features/templateSlice";
import uiReducer from "@/redux/features/uiSlice";
import authReducer from "@/redux/features/authSlice";
// Create a custom storage engine for session storage
const createSessionStorage = () => {
  if (typeof window !== "undefined") {
    return {
      getItem: (key: string) => {
        return Promise.resolve(sessionStorage.getItem(key));
      },
      setItem: (key: string, item: string) => {
        return Promise.resolve(sessionStorage.setItem(key, item));
      },
      removeItem: (key: string) => {
        return Promise.resolve(sessionStorage.removeItem(key));
      },
    };
  }
  return createNoopStorage();
};

// Create noop storage for SSR
const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

// Use session storage instead of local storage
const storage = createSessionStorage();

// ***** persistConfig *****
const persistConfig = {
  key: "landing-app",
  blacklist: ["app", "template", "ui", "auth"], // Don't persist template state - load fresh from database
  storage,
};

// ***** rootReducer *****
const rootReducer = combineReducers({
  app: appReducer,
  template: templateReducer,
  ui: uiReducer,
  auth: authReducer,
});

// ***** persistedReducer *****
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ***** reduxStore *****
export const reduxStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// ***** persistor *****
export const persistor = persistStore(reduxStore);

// ***** hooks *****
export const useDispatch = () => useReduxDispatch<ReduxDispatch>();
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;

// ***** removePersistStore *****
export const removePersistStore = () => {
  persistor.pause();
  return persistor.flush().then(() => {
    return persistor?.purge();
  });
};

// ***** types *****
export type ReduxStore = typeof reduxStore;
export type ReduxState = ReturnType<typeof reduxStore.getState>;
export type ReduxDispatch = typeof reduxStore.dispatch;
export type ReduxThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  Action
>;
