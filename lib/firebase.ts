import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBc1Wc0YRzR_LJ6oNiTjCl1YVBT6cabqMk",
  authDomain: "mymoney-bc3b5.firebaseapp.com",
  projectId: "mymoney-bc3b5",
  storageBucket: "mymoney-bc3b5.firebasestorage.app",
  messagingSenderId: "1035826283932",
  appId: "1:1035826283932:web:6aec7c5a231b11cf2af459",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;
