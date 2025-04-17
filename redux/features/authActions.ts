import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  logout,
} from "./authSlice";

// Login with email and password
export const loginWithEmailAsync = createAsyncThunk(
  "auth/loginWithEmail",
  async (
    { email, password }: { email: string; password: string },
    { dispatch }
  ) => {
    try {
      dispatch(loginRequest());
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = {
        id: userCredential.user.uid,
        email: userCredential.user.email || "",
        displayName: userCredential.user.displayName || undefined,
        photoURL: userCredential.user.photoURL || undefined,
      };
      dispatch(loginSuccess(user));
      return user;
    } catch (error: any) {
      const errorMessage = error.message || "Login failed";
      dispatch(loginFailure(errorMessage));
      throw new Error(errorMessage);
    }
  }
);

// Login with Google
export const loginWithGoogleAsync = createAsyncThunk(
  "auth/loginWithGoogle",
  async (_, { dispatch }) => {
    try {
      dispatch(loginRequest());
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = {
        id: userCredential.user.uid,
        email: userCredential.user.email || "",
        displayName: userCredential.user.displayName || undefined,
        photoURL: userCredential.user.photoURL || undefined,
      };
      dispatch(loginSuccess(user));
      return user;
    } catch (error: any) {
      const errorMessage = error.message || "Google login failed";
      dispatch(loginFailure(errorMessage));
      throw new Error(errorMessage);
    }
  }
);

// Register with email and password
export const registerWithEmailAsync = createAsyncThunk(
  "auth/registerWithEmail",
  async (
    { email, password }: { email: string; password: string },
    { dispatch }
  ) => {
    try {
      dispatch(registerRequest());
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = {
        id: userCredential.user.uid,
        email: userCredential.user.email || "",
        displayName: userCredential.user.displayName || undefined,
        photoURL: userCredential.user.photoURL || undefined,
      };
      dispatch(registerSuccess(user));
      return user;
    } catch (error: any) {
      const errorMessage = error.message || "Registration failed";
      dispatch(registerFailure(errorMessage));
      throw new Error(errorMessage);
    }
  }
);

// Logout
export const logoutAsync = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    try {
      await signOut(auth);
      dispatch(logout());
      return true;
    } catch (error: any) {
      console.error("Logout failed:", error);
      throw new Error("Logout failed");
    }
  }
);
