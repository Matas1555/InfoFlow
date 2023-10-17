import React, { useState, useEffect } from "react";
import HomePage from "./page_components/HomePage";
import About from "./page_components/About";
import Contact from "./page_components/Contact";
import Login from "./page_components/Login";
import SideBar from "./page_components/SideBar";
import NavBar from "./page_components/NavBar";
import "./css/main.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return ( 
    <> 
      <BrowserRouter>
      <NavBar />
      {/* <SideBar /> */}
        <Routes>
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/About" element ={<About/>} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Login" element ={<Login/>} />
        </Routes>
      </BrowserRouter>
    

    </>
  );
}

export default App;
