// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7hpzpUkFb0XN8Jthexi-ZCMEIL8ekqVY",
  authDomain: "react-social-media-app-b4c96.firebaseapp.com",
  projectId: "react-social-media-app-b4c96",
  storageBucket: "react-social-media-app-b4c96.appspot.com",
  messagingSenderId: "306755576797",
  appId: "1:306755576797:web:1c32a34bd7f593037fcc34",
  measurementId: "G-99HCKF16TQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);