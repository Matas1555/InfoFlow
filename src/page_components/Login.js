import "../css/login.css";
import { auth } from "../firebaseConfig";
import { realtimeDatabase } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ForgotPass from "./ForgotPass";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { ref, set, update } from "firebase/database";

import React, { useRef, useEffect } from "react";
import transition from "../transition";

const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const usernameRef = useRef(null);
  const repeatPasswordRef = useRef(null);
  const allowScrolling = false;

  useEffect(() => {
    document.body.style.overflowY = allowScrolling ? "scroll" : "hidden";
  }, []);

  const emailRefLogIn = useRef(null);
  const passwordRefLogIn = useRef(null);

  const handleLogIn = async () => {
    const email = emailRefLogIn.current.value;
    const password = passwordRefLogIn.current.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        var userID = auth.currentUser;

        if (userCredential.user.emailVerified) {
          // A post entry.
          const postData = {
            lastLogin: Date.now(),
          };

          console.log("logged in!");
          navigate("/");
          return update(ref(realtimeDatabase, "users/" + userID.uid), postData);
        } else {
          auth.signOut();
          alert("Email has not been verified!");
        }
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

    //TODO make a pop up to say what is wrong so the user can see it
    if (!isEmailValid(email)) {
      console.log("Email is bad!");
      alert("Email is bad!");
      return;
    }

    if (!isPasswordValid(password)) {
      console.log("Password is bad!");
      alert("Password is bad!");
      return;
    }

    if (repeatPassword !== password) {
      console.log("Passwords do not match!");
      alert("Passwords do not match!");
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

        updateProfile(auth.currentUser, {
          displayName: userName,
          photoURL: "",
        })
          .then(() => {
            // Profile updated!
            // ...
          })
          .catch((error) => {
            alert(error.message);
          });

        set(ref(realtimeDatabase, "users/" + userID.uid), {
          email: email,
          username: userName,
          avatar: "",
          lastLogin: Date.now(),
        });

        sendEmailVerification(auth.currentUser).then(() => {
          console.log("Email verification sent!");
        });

        auth.signOut();

        alert(
          "An email has been sent to your email account, please click the link to verify it."
        );
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
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
        <input
          id="tab-1"
          type="radio"
          name="tab"
          className="sign-in"
          checked
          readOnly
        />
        <label htmlFor="tab-1" className="tab">
          Sign In
        </label>
        <input
          id="tab-2"
          type="radio"
          name="tab"
          className="sign-up"
          readOnly
        />
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
              <Link to="/ForgotPass">
                <p>Forgot Password?</p>
              </Link>
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
              <label htmlFor="tab-1">Already a Member?</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default transition(Login);
