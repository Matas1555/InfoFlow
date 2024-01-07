import React, { useState, useEffect } from "react";
import "../css/navbar.css";
import InfoFlowIcon from "../assets/LOGO.png";
import dafaultProfilePhoto from "../assets/default_profile.png";

import { Link } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { realtimeDatabase } from "../firebaseConfig";
import { ref, set, update, onValue } from "firebase/database";
import Profile from "./Profile";
import LikedPosts from "./LikedPosts";

export default function NavBar({ onLanguageChange }) {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [activeNavItem, setActiveNavItem] = useState("");

  function showPopup() {
    setPopupVisible(true);
  }

  function hidePopup() {
    setPopupVisible(false);
  }

  function getSelectedLanguage() {
    const form = document.getElementById("popup");
    const selectedLanguage = form.querySelector(
      'input[name="lang"]:checked'
    ).value;
    onLanguageChange(selectedLanguage);
    console.log(selectedLanguage);
  }

  function handleClick() {
    hidePopup();
    getSelectedLanguage();
  }

  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    //Getting data from realtime database
    if (user !== null) {
      const avatarRef = ref(realtimeDatabase, "/users/" + user.uid);

      onValue(
        avatarRef,
        (snapshot) => {
          const user = snapshot.val();
          if (user.avatar === "") {
            setAvatar(dafaultProfilePhoto);
            console.log(avatar);
          }
        },
        {
          onlyOnce: true,
        }
      );
    }

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="nav_bar_wrapper">
      <header>
        <Link to="/HomePage">
          <img className="logo" src={InfoFlowIcon} alt="logo"></img>
        </Link>

        <nav>
          <ul className="nav_bar">
            <li>
              {user ? (
                <Profile />
              ) : (
                <Link
                  to="/Login"
                  onMouseEnter={() => setActiveNavItem("login")}
                  onMouseLeave={() => setActiveNavItem("")}
                >
                  <div className="nav_about">Login</div>
                </Link>
              )}
            </li>
            <li>
              {user ? (
                <Link
                  to="/LikedPosts"
                  onMouseEnter={() => setActiveNavItem("login")}
                  onMouseLeave={() => setActiveNavItem("")}
                >
                  <div className="nav_about">Liked articles</div>
                </Link>
              ) : null}
            </li>
            <li className="animate">
              <Link
                to="/Contact"
                onMouseEnter={() => setActiveNavItem("contact")}
                onMouseLeave={() => setActiveNavItem("")}
              >
                <div className="nav_about">Contact</div>
              </Link>
            </li>
            <li>
              <Link
                to="/About"
                onMouseEnter={() => setActiveNavItem("about")}
                onMouseLeave={() => setActiveNavItem("")}
              >
                <div className="nav_about">About</div>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
