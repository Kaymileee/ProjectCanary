import "firebase/compat/auth";
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBmIQ9-oUSHyxbQewz6CuYn5NkvKWsiQ_U",
  authDomain: "fir-auth-f08ad.firebaseapp.com",
  projectId: "fir-auth-f08ad",
  storageBucket: "fir-auth-f08ad.appspot.com",
  messagingSenderId: "401313850943",
  appId: "1:401313850943:web:5f9f2f3cdf6686138e3a8a",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
