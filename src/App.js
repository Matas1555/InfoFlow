import React, { useState, useEffect } from "react";
import HomePage from "./page_components/HomePage";
import About from "./page_components/About";
import Contact from "./page_components/Contact";
import Login from "./page_components/Login";
import SideBar from "./page_components/SideBar";
import NavBar from "./page_components/NavBar";
import ForgotPass from "./page_components/ForgotPass";
import LikedPosts from "./page_components/LikedPosts";
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
import { app, db } from "./firebaseConfig";

import {
  uploadArticles,
  fetchTopArticles,
  uploadArticlesLanguage,
} from "./page_components/fetchArticles";

const App = () => {
  const location = useLocation();
  const [articles, setArticles] = useState([]);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const yesterdayDateString = yesterday.toISOString().split("T")[0];

  const category = "General";
  const country = "us";

  //Upon loading the website an API call is made
  useEffect(() => {
    // const executeArticleFetching = async (country, category, date) => {
    //   fetchTopArticles(country, category, date)
    //     .then((articles) => {
    //       setArticles(articles);
    //       uploadArticles(articles, date, category);
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching top articles: ", error);
    //     });
    // };
    // const executeArticleFetchingByCountry = async (country, category, date) => {
    //   fetchTopArticles(country, category, date)
    //     .then((articles) => {
    //       setArticles(articles);
    //       uploadArticlesLanguage(articles, date, category, country);
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching top articles: ", error);
    //     });
    // };
    // executeArticleFetching(country, "general", yesterdayDateString);
    // executeArticleFetching(country, "business", yesterdayDateString);
    // executeArticleFetching(country, "entertainment", yesterdayDateString);
    // executeArticleFetching(country, "health", yesterdayDateString);
    // executeArticleFetching(country, "science", yesterdayDateString);
    // executeArticleFetching(country, "sports", yesterdayDateString);
    // executeArticleFetching(country, "technology", yesterdayDateString);
    // executeArticleFetchingByCountry("ar", "general", yesterdayDateString);
    // executeArticleFetchingByCountry("de", "general", yesterdayDateString);
    // executeArticleFetchingByCountry("es", "general", yesterdayDateString);
    // executeArticleFetchingByCountry("fr", "general", yesterdayDateString);
    // executeArticleFetchingByCountry("he", "general", yesterdayDateString);
    // executeArticleFetchingByCountry("it", "general", yesterdayDateString);
    // executeArticleFetchingByCountry("nl", "general", yesterdayDateString);
    // executeArticleFetchingByCountry("no", "general", yesterdayDateString);
    // executeArticleFetchingByCountry("pt", "general", yesterdayDateString);
    // executeArticleFetchingByCountry("ru", "general", yesterdayDateString);
    // executeArticleFetchingByCountry("sv", "general", yesterdayDateString);
  }, []);

  return (
    <div className="background-container">
      <NavBar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/About" element={<About />} />
          <Route path="/LikedPosts" element={<LikedPosts />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/ForgotPass" element={<ForgotPass />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;
