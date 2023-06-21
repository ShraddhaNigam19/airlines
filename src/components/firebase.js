import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBMPL-ZOGqCs_F3cflmEh5wt275WlDH2EE",
  authDomain: "airline-bf999.firebaseapp.com",
  projectId: "airline-bf999",
  storageBucket: "airline-bf999.appspot.com",
  messagingSenderId: "455937413060",
  appId: "1:455937413060:web:8eb7fbe470e6681ec61e91",
  measurementId: "G-RBLNMERX51",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const signOut = () => firebaseSignOut(auth);

export {
  app,
  auth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut,
};
