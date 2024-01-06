// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsPD3jp5S8NZQdQvedxC7PdvBvwUIRu3I",
  authDomain: "infoflow-3161d.firebaseapp.com",
  databaseURL:
    "https://infoflow-3161d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "infoflow-3161d",
  storageBucket: "infoflow-3161d.appspot.com",
  messagingSenderId: "502249630136",
  appId: "1:502249630136:web:6632f661ae525a3e11c74d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const realtimeDatabase = getDatabase(app);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
//Initialize Firebase auth
