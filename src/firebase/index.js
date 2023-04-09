// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA33kWkBlxohk53bH7YmrkSIR_2r-oRMKg",
  authDomain: "controlpet-7bf17.firebaseapp.com",
  projectId: "controlpet-7bf17",
  storageBucket: "controlpet-7bf17.appspot.com",
  messagingSenderId: "127050659986",
  appId: "1:127050659986:web:54064731d235fd6e5d8e4b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//modules --
const auth = getAuth(app);

export {
  auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword
};
