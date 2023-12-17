import React, { useState, useEffect } from "react";
import "../css/navbar.css";
import InfoFlowIcon from "../assets/LOGO.png";
import dafaultProfilePhoto from "../assets/default_profile.png";

import { Link } from "react-router-dom";
import { auth } from "../App";
import { database } from "../App";
import { ref, set, update, onValue } from "firebase/database";
import Profile from "./Profile";

export default function NavBar({ onLanguageChange }) {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [avatar, setAvatar] = useState("");

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
      const avatarRef = ref(database, "/users/" + user.uid);

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

        {/*--------------- Popup window html -------------------*/}
        <button className="button button-dark" onClick={showPopup}>
          Choose country
        </button>
        {isPopupVisible && (
          <form className="popup" id="popup">
            <p>Please select your country:</p>
            <input type="radio" name="lang" id="ar" value="ar" />
            <label htmlFor="ar">Saudi arabia &#128514; </label>
            <br />
            <input type="radio" name="lang" id="de" value="de" />
            <label htmlFor="de">Germany 🇩🇪 </label>
            <br />
            <input type="radio" name="lang" id="us" value="us" />
            <label htmlFor="us">United States </label>
            <br />
            <input type="radio" name="lang" id="es" value="es" />
            <label htmlFor="es">Spain 🇪🇸 </label>
            <br />
            <input type="radio" name="lang" id="fr" value="fr" />
            <label htmlFor="fr">France 🇫🇷 </label>
            <br />
            <input type="radio" name="lang" id="he" value="he" />
            <label htmlFor="he">Isreal 🇮🇱 </label>
            <br />
            <input type="radio" name="lang" id="it" value="it" />
            <label htmlFor="it">Italy 🇮🇹 </label>
            <br />
            <input type="radio" name="lang" id="nl" value="nl" />
            <label htmlFor="nl">Netherlands 🇳🇱 </label>
            <br />
            <input type="radio" name="lang" id="no" value="no" />
            <label htmlFor="no">Norway 🇳🇴 </label>
            <br />
            <input type="radio" name="lang" id="pt" value="pt" />
            <label htmlFor="pt">Portugal 🇵🇹 </label>
            <br />
            <input type="radio" name="lang" id="ru" value="ru" />
            <label htmlFor="ru">Russia 🇷🇺 </label>
            <br />
            <input type="radio" name="lang" id="sv" value="sv" />
            <label htmlFor="sv">Sweden 🇸🇪 </label>
            <br />
            <button onClick={() => handleClick()}>Submit</button>
          </form>
        )}
        {isPopupVisible && <div className="overlay" onClick={hidePopup}></div>}
        {/*--------------- Popup window html -------------------*/}

        <nav>
          <ul className="nav_bar">
            <li>
              <Link to="/About">
                <div className="nav_about">About</div>
              </Link>
            </li>
            <li>
              <Link to="/Contact">
                <div className="nav_about">Contact</div>
              </Link>
            </li>
            <li>
              {user ? (
                <Profile />
              ) : (
                <Link to="/Login">
                  <div className="nav_about">Login</div>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
