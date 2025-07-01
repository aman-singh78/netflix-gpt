// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB61aZac9IyRTWSEu36rMJ_vfU5YaYSlCc",
  authDomain: "netflixgpt-c1cc9.firebaseapp.com",
  projectId: "netflixgpt-c1cc9",
  storageBucket: "netflixgpt-c1cc9.firebasestorage.app",
  messagingSenderId: "546865731447",
  appId: "1:546865731447:web:85ff30fc4b7744ea60b372",
  measurementId: "G-HX9JGK6JVL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
