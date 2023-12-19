import React, { useState, useEffect } from "react";
import HomePage from "./page_components/HomePage";
import About from "./page_components/About";
import Contact from "./page_components/Contact";
import Login from "./page_components/Login";
import SideBar from "./page_components/SideBar";
import NavBar from "./page_components/NavBar";
import Register from "./page_components/Register";
import background from "../src/assets/newspaper.jpg";
import "./css/main.css";
import {
  BrowserRouter,
  Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

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
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
//Initialize Firebase auth

// Higher-order component to include NavBar for all routes except HomePage
const App = () => {
  const location = useLocation();
  return (
    <div className="background-container">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <>
              {/* <NavBar /> */}
              <HomePage />
              {/* <Route path="/HomePage" index element={<HomePage />} /> */}
            </>
          }
        />
        <Route
          path="/HomePage"
          element={
            <>
              <HomePage />
            </>
          }
        />
        <Route
          path="/About"
          element={
            <>
              <NavBar />
              <About />
            </>
          }
        />
        <Route
          path="/Contact"
          element={
            <>
              <NavBar />
              <Contact />
            </>
          }
        />
        <Route
          path="/Login"
          element={
            <>
              <NavBar />
              <Login />
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
