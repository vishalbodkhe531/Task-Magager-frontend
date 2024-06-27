// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "notebook-4b739.firebaseapp.com",
  projectId: "notebook-4b739",
  storageBucket: "notebook-4b739.appspot.com",
  messagingSenderId: "792890857510",
  appId: "1:792890857510:web:f744248057f237e6b36ee7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
