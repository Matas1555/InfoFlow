import "../css/login.css";
import React, { useRef, useEffect } from "react";
import { auth } from "../firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPass() {
  const emailRef = useRef(null);
  const allowScrolling = false;

  useEffect(() => {
    document.body.style.overflowY = allowScrolling ? "scroll" : "hidden";
  }, []);

  const handleEmail = async () => {
    await sendPasswordResetEmail(auth, emailRef.current.value)
      .then(() => alert("Password reset email sent!"))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="login-wrap">
      <div className="login-html">
        <input id="tab-1" type="radio" name="tab" className="sign-in" checked />
        <label htmlFor="tab-1" className="tab">
          Type in your email
        </label>

        <input id="tab-2" type="radio" name="tab" className="sign-up" />
        <label htmlFor="tab-2" className="tab"></label>
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
                ref={emailRef}
              />
            </div>
            <div className="group">
              <button onClick={() => handleEmail()} className="button">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
