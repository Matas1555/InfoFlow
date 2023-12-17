import "../css/login.css";
import { auth } from "../App";
import { database } from "../App";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ref, set, update } from "firebase/database";

import React, { useRef } from "react";

export default function Login() {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const usernameRef = useRef(null);
  const repeatPasswordRef = useRef(null);

  const emailRefLogIn = useRef(null);
  const passwordRefLogIn = useRef(null);

  const handleLogIn = async () => {
    const email = emailRefLogIn.current.value;
    const password = passwordRefLogIn.current.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        var userID = auth.currentUser;

        // A post entry.
        const postData = {
          lastLogin: Date.now(),
        };

        console.log("logged in!");
        navigate("/");
        return update(ref(database, "users/" + userID.uid), postData);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  const handleSignUp = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const userName = usernameRef.current.value;
    const repeatPassword = repeatPasswordRef.current.value;

    console.log(userName);
    console.log(email);
    console.log(password);

    //TODO make a pop up to say what is wrong so the user can see it
    if (!isEmailValid(email)) {
      console.log("Email is bad!");
      return;
    }

    if (!isPasswordValid(password)) {
      console.log("Password is bad!");
      return;
    }

    if (repeatPassword !== password) {
      console.log("Passwords do not match!");
      return;
    }

    if (
      !isFieldValid(userName) ||
      !isFieldValid(password) ||
      !isFieldValid(email)
    ) {
      console.log("Password is bad!");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);

        var userID = auth.currentUser;

        set(ref(database, "users/" + userID.uid), {
          email: email,
          username: userName,
          avatar: "",
          lastLogin: Date.now(),
        });

        alert("User created!");
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  const isEmailValid = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    if (password < 6) {
      return false;
    } else {
      return true;
    }
  };

  const isFieldValid = (field) => {
    if (field <= 0) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="login-wrap">
      <div className="login-html">
        <input id="tab-1" type="radio" name="tab" className="sign-in" checked />
        <label htmlFor="tab-1" className="tab">
          Sign In
        </label>
        <input id="tab-2" type="radio" name="tab" className="sign-up" />
        <label htmlFor="tab-2" className="tab">
          Sign Up
        </label>
        <div className="login-form">
          <div className="sign-in-htm">
            <div className="group">
              <label htmlFor="user" className="label">
                Email
              </label>
              <input
                id="user"
                type="text"
                className="input"
                name="email"
                ref={emailRefLogIn}
              />
            </div>
            <div className="group">
              <label htmlFor="pass" className="label">
                Password
              </label>
              <input
                id="pass"
                type="password"
                className="input"
                data-type="password"
                ref={passwordRefLogIn}
              />
            </div>
            <div className="group">
              <input
                type="submit"
                onClick={() => handleLogIn()}
                className="button"
                value="Sign In"
              />
            </div>
            <div className="hr"></div>
            <div className="foot-lnk">
              <a href="#forgot">Forgot Password?</a>
            </div>
          </div>
          <div className="sign-up-htm">
            <div className="group">
              <label htmlFor="user" className="label">
                Username
              </label>
              <input
                id="user"
                type="text"
                className="input"
                ref={usernameRef}
              />
            </div>
            <div className="group">
              <label htmlFor="pass" className="label">
                Password
              </label>
              <input
                id="pass"
                type="password"
                className="input"
                data-type="password"
                ref={passwordRef}
              />
            </div>
            <div className="group">
              <label htmlFor="pass" className="label">
                Repeat Password
              </label>
              <input
                id="pass"
                type="password"
                className="input"
                data-type="password"
                ref={repeatPasswordRef}
              />
            </div>
            <div className="group">
              <label htmlFor="pass" className="label">
                Email Address
              </label>
              <input id="email" type="text" className="input" ref={emailRef} />
            </div>
            <div className="group">
              <input
                type="submit"
                className="button"
                onClick={() => handleSignUp()}
                value="Sign Up"
              />
            </div>
            <div className="hr"></div>
            <div className="foot-lnk">
              <label htmlFor="tab-1">Already Member?</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
