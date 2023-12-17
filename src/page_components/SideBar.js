import "../css/sidebar.css";
import "../assets/font-awesome/css/font-awesome.min.css";

import { auth } from "../App";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SideBar({ onCategoryChange }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const selectCategory = (category) => {
    onCategoryChange(category);
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
          <li>
            <button onClick={() => selectCategory("general")}>
              <i className="fa fa-users fa-lg" aria-hidden="true"></i>{" "}
              <span></span> General
            </button>
          </li>
          <li>
            <button onClick={() => selectCategory("entertainment")}>
              <i className="fa fa-television fa-lg" aria-hidden="true"></i>{" "}
              <span></span> Entertainment
            </button>
          </li>
          <li>
            <button onClick={() => selectCategory("business")}>
              <i className="fa fa-briefcase fa-lg" aria-hidden="true"></i>{" "}
              <span></span> Business
            </button>
          </li>
          <li>
            <button onClick={() => selectCategory("health")}>
              <i className="fa fa-medkit fa-lg" aria-hidden="true"></i>{" "}
              <span></span> Health
            </button>
          </li>
          <li>
            <button onClick={() => selectCategory("science")}>
              <i className="fa fa-flask fa-lg" aria-hidden="true"></i>{" "}
              <span></span> Science
            </button>
          </li>
          <li>
            <button onClick={() => selectCategory("sports")}>
              <i className="fa fa-trophy fa-lg" aria-hidden="true"></i>{" "}
              <span></span> Sports
            </button>
          </li>
          <li>
            <button onClick={() => selectCategory("technology")}>
              <i className="fa fa-cog fa-lg" aria-hidden="true"></i>{" "}
              <span></span> Technology
            </button>
          </li>
        </ul>
        <ul className="nav_sidebar_logout">
          <li>
            {user ? (
              <button onClick={handleLogout}>
                <i className="fa fa-power-off fa-lg"></i> <span></span> Logout
              </button>
            ) : (
              <></>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
