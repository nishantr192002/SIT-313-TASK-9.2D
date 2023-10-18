import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"; // Add this import for Auth

const firebaseConfig = {
  apiKey: "AIzaSyD5allblqlU2NxfkmnGPl494ewT7WZFEBg",
  authDomain: "sit313task9-2.firebaseapp.com",
  databaseURL: "https://sit313task9-2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sit313task9-2",
  storageBucket: "sit313task9-2.appspot.com",
  messagingSenderId: "686121204045",
  appId: "1:686121204045:web:5e0e79880543ea1c7a1f04",
  measurementId: "G-EC38D76ZVM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app); // Add this line to include Auth
