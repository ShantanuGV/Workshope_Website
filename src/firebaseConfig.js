// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJEPdc8jKtSvPQagvk-wOUlJTPJDoTzGc",
  authDomain: "certificate-portal-fb4cf.firebaseapp.com",
  projectId: "certificate-portal-fb4cf",
  storageBucket: "certificate-portal-fb4cf.firebasestorage.app",
  messagingSenderId: "208984684961",
  appId: "1:208984684961:web:7e922d6a3e4eee9e7473e0",
  measurementId: "G-BV2MR0KRV4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);