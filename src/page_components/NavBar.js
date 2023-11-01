import React, { useState } from "react";
import "../css/navbar.css";
import InfoFlowIcon from "../assets/LOGO.png";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [isPopupVisible, setPopupVisible] = useState(false);

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
  }

  function handleClick() {
    hidePopup();
    getSelectedLanguage();
  }

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
            <label htmlFor="ar">Arabic</label>
            <br />
            <input type="radio" name="lang" id="de" value="de" />
            <label htmlFor="de">German</label>
            <br />
            <input type="radio" name="lang" id="en" value="en" />
            <label htmlFor="en">English</label>
            <br />
            <input type="radio" name="lang" id="es" value="es" />
            <label htmlFor="es">Spanish</label>
            <br />
            <input type="radio" name="lang" id="fr" value="fr" />
            <label htmlFor="fr">French</label>
            <br />
            <input type="radio" name="lang" id="he" value="he" />
            <label htmlFor="he">Hebrew</label>
            <br />
            <input type="radio" name="lang" id="it" value="it" />
            <label htmlFor="it">Italian</label>
            <br />
            <input type="radio" name="lang" id="nl" value="nl" />
            <label htmlFor="nl">Dutch</label>
            <br />
            <input type="radio" name="lang" id="no" value="no" />
            <label htmlFor="no">Norwegian</label>
            <br />
            <input type="radio" name="lang" id="pt" value="pt" />
            <label htmlFor="pt">Portuguese</label>
            <br />
            <input type="radio" name="lang" id="ru" value="ru" />
            <label htmlFor="ru">Russian</label>
            <br />
            <input type="radio" name="lang" id="sv" value="sv" />
            <label htmlFor="sv">Swedish</label>
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
              <Link to="/Login">
                <div className="nav_about">Login</div>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
