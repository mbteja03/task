// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCTOxKqLhf8CJ9FFLNDKMqdM0h4MKyv5nQ",
  authDomain: "task-management-tool-2b99a.firebaseapp.com",
  projectId: "task-management-tool-2b99a",
  storageBucket: "task-management-tool-2b99a.firebasestorage.app",
  messagingSenderId: "187846690735",
  appId: "1:187846690735:web:ded11165dac40bda7e515a",
  measurementId: "G-CVTVDM9ZY5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };
