import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBYdEPfXt18DJ87CmWyvML6wV3JqePiDf0",
  authDomain: "dbidashboard.firebaseapp.com",
  projectId: "dbidashboard",
  storageBucket: "dbidashboard.firebasestorage.app",
  messagingSenderId: "769612488132",
  appId: "1:769612488132:web:cbd4ed557190be69ecd891"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialiser Auth og Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Eksporter funktionerne for brug i andre filer
export { 
    auth, 
    db, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
  };