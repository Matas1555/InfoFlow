import "../css/sidebar.css";
import "../assets/font-awesome/css/font-awesome.min.css";

import { auth } from "../firebaseConfig";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SideBar = ({ onCategoryChange, onCountryChange }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select your country!");

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleOptionSelect = (option) => {
    onCategoryChange(option);
    setIsDropdownOpen(false);
  };

  const handleCountrySelect = (country) => {
    onCountryChange(country);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut();
    window.location.reload();
    navigate("/");
    console.log("logged out");
  };

  return (
    <div className="container">
      <nav className="nav_sidebar">
        <ul className="nav_sidebar_cat">
          <li>
            <h1 className="nav_sidebar_h1">
              <i className="fa fa-bars fa-lg " aria-hidden="true"></i>
              <span></span> Categories
            </h1>
          </li>
          <div className="category_buttons">
            <li>
              <button onClick={() => onCategoryChange("general")}>
                <i className="fa fa-users fa-lg" aria-hidden="true"></i>{" "}
                <span></span> General
              </button>
            </li>
            <li>
              <button onClick={() => onCategoryChange("entertainment")}>
                <i className="fa fa-television fa-lg" aria-hidden="true"></i>{" "}
                <span></span> Entertainment
              </button>
            </li>
            <li>
              <button onClick={() => onCategoryChange("business")}>
                <i className="fa fa-briefcase fa-lg" aria-hidden="true"></i>{" "}
                <span></span> Business
              </button>
            </li>
            <li>
              <button onClick={() => onCategoryChange("health")}>
                <i className="fa fa-medkit fa-lg" aria-hidden="true"></i>{" "}
                <span></span> Health
              </button>
            </li>
            <li>
              <button onClick={() => onCategoryChange("science")}>
                <i className="fa fa-flask fa-lg" aria-hidden="true"></i>{" "}
                <span></span> Science
              </button>
            </li>
            <li>
              <button onClick={() => onCategoryChange("sports")}>
                <i className="fa fa-trophy fa-lg" aria-hidden="true"></i>{" "}
                <span></span> Sports
              </button>
            </li>
            <li>
              <button onClick={() => onCategoryChange("technology")}>
                <i className="fa fa-cog fa-lg" aria-hidden="true"></i>{" "}
                <span></span> Technology
              </button>
            </li>
            <li className="nav_sidebar_logout">
              {user ? (
                <button
                  className="nav_sidebar_logout_button"
                  onClick={handleLogout}
                >
                  <i className="fa fa-power-off fa-lg"></i> <span></span> Logout
                </button>
              ) : (
                <></>
              )}
            </li>
          </div>
          <li>
            <div className="center">
              <div className="container">
                <div className="setting-description">
                  <div
                    className="setting-description-text"
                    style={{ marginLeft: 15 }}
                  >
                    <p className="h10tag">Where are you from?</p>
                  </div>
                </div>
                <div
                  className={`wrapper-dropdown ${
                    isDropdownOpen ? "active" : ""
                  }`}
                  id="dropdown"
                >
                  <span
                    className="selected-display"
                    onClick={handleDropdownToggle}
                    id="destination"
                  >
                    {selectedOption}
                  </span>
                  <svg
                    onClick={handleDropdownToggle}
                    className={`arrow ${isDropdownOpen ? "rotated" : ""}`}
                    id="drp-arrow"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 14.5l5-5 5 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <ul className="dropdown">
                    <li
                      className="item"
                      onClick={() => handleCountrySelect("ar")}
                    >
                      <label htmlFor="ar">Saudi arabia &#128514; </label>
                    </li>
                    <li
                      className="item"
                      onClick={() => handleCountrySelect("de")}
                    >
                      <label htmlFor="de">Germany 🇩🇪 </label>
                    </li>
                    <li
                      className="item"
                      onClick={() => handleCountrySelect("us")}
                    >
                      <label htmlFor="us">United States 🇺🇸 </label>
                    </li>
                    <li
                      className="item"
                      onClick={() => handleCountrySelect("es")}
                    >
                      <label htmlFor="es">Spain 🇪🇸 </label>
                    </li>
                    <li
                      className="item"
                      onClick={() => handleCountrySelect("fr")}
                    >
                      <label htmlFor="fr">France 🇫🇷 </label>
                    </li>
                    <li
                      className="item"
                      onClick={() => handleCountrySelect("he")}
                    >
                      <label htmlFor="he">Isreal 🇮🇱 </label>
                    </li>
                    <li
                      className="item"
                      onClick={() => handleCountrySelect("it")}
                    >
                      <label htmlFor="it">Italy 🇮🇹 </label>
                    </li>
                    <li
                      className="item"
                      onClick={() => handleCountrySelect("nl")}
                    >
                      <label htmlFor="nl">Netherlands 🇳🇱 </label>
                    </li>
                    <li
                      className="item"
                      onClick={() => handleCountrySelect("no")}
                    >
                      <label htmlFor="no">Norway 🇳🇴 </label>
                    </li>
                    <li
                      className="item"
                      onClick={() => handleCountrySelect("pt")}
                    >
                      <label htmlFor="pt">Portugal 🇵🇹 </label>
                    </li>
                    <li
                      className="item"
                      onClick={() => handleCountrySelect("ru")}
                    >
                      <label htmlFor="ru">Russia 🇷🇺 </label>
                    </li>
                    <li
                      className="item"
                      onClick={() => handleCountrySelect("sv")}
                    >
                      <label htmlFor="sv">Sweden 🇸🇪 </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <ul></ul>
      </nav>
    </div>
  );
};

export default SideBar;
