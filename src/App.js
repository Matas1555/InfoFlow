import React, { useState, useEffect } from "react";
import HomePage from "./page_components/HomePage";
import About from "./page_components/About";
import Contact from "./page_components/Contact";
import Login from "./page_components/Login";
import SideBar from "./page_components/SideBar";
import NavBar from "./page_components/NavBar";
import Register from "./page_components/Register";
import "./css/main.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Higher-order component to include NavBar for all routes except HomePage
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
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
        {/* <Route path="/About" element={<About />} /> */}
        {/* <Route path="/Contact" element={<Contact />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
