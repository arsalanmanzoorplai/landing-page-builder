import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase"; // Assuming firebase is set up in lib/firebase

interface UseFirestoreTemplateReturn {
  saveTemplate: (userId: string) => Promise<string>;
  updateTemplate: (templateId: string) => Promise<void>;
  deleteTemplate: (templateId: string) => Promise<void>;
  loadTemplate: (templateId: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const useFirestoreTemplate = (): UseFirestoreTemplateReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const templateData = useSelector((state: any) => state.template);

  const saveTemplate = async (userId: string): Promise<string> => {
    setIsLoading(true);
    setError(null);
    try {
      const docRef = await addDoc(collection(db, "templates"), {
        userId,
        templateData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      setIsLoading(false);
      return docRef.id;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save template");
      setIsLoading(false);
      throw err;
    }
  };

  const updateTemplate = async (templateId: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const templateRef = doc(db, "templates", templateId);
      await updateDoc(templateRef, {
        templateData,
        updatedAt: new Date(),
      });
      setIsLoading(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update template"
      );
      setIsLoading(false);
      throw err;
    }
  };

  const deleteTemplate = async (templateId: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const templateRef = doc(db, "templates", templateId);
      await deleteDoc(templateRef);
      setIsLoading(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete template"
      );
      setIsLoading(false);
      throw err;
    }
  };

  const loadTemplate = async (templateId: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const templateRef = doc(db, "templates", templateId);
      const templateSnap = await getDoc(templateRef);

      if (templateSnap.exists()) {
        const data = templateSnap.data();
        dispatch({ type: "template/setTemplate", payload: data.templateData });
      } else {
        throw new Error("Template not found");
      }
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load template");
      setIsLoading(false);
      throw err;
    }
  };

  return {
    saveTemplate,
    updateTemplate,
    deleteTemplate,
    loadTemplate,
    isLoading,
    error,
  };
};
