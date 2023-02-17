// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4fCmJ8Kss6uNBt5E8Mzc_Lfe9iqDwiVk",
  authDomain: "work-place-2bda5.firebaseapp.com",
  projectId: "work-place-2bda5",
  storageBucket: "work-place-2bda5.appspot.com",
  messagingSenderId: "367467676435",
  appId: "1:367467676435:web:f7517bccfcd923fc4a50e6",
  measurementId: "G-LJBHNE09WC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db=getFirestore(app);