import transition from "../transition";
import photo from "../assets/About/newspaper-black-and-white-recording-wallpapper.jpg";
import "../css/contact.css";
import React, { useRef, useEffect } from "react";
import emailjs from "emailjs-com";

const Contact = () => {
  const form = useRef();
  const allowScrolling = false;

  useEffect(() => {
    document.body.style.overflowY = allowScrolling ? "scroll" : "hidden";
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.init("E17NlWvktUyAYOvfN");

    emailjs.sendForm("service_n8xc6bc", "template_9cdxt28", form.current).then(
      (result) => {
        alert(
          "Your message has been sent, we will get back to you as soon as possible!"
        );
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
  };

  // const handleContact = () => {
  //   const email = emailRef.current.value;
  //   const username = usernameRef.current.value;
  //   const message = messageRef.current.value;

  //   emailjs
  //     .sendForm(
  //       "service_n8xc6bc",
  //       "template_9cdxt28",
  //       {
  //         from_name: username,
  //         message: message,
  //         userEmail: email,
  //       },
  //       "E17NlWvktUyAYOvfN"
  //     )
  //     .then(
  //       (result) => {
  //         //window.location.reload(); //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior)
  //         alert("Your message has been sent!");
  //       },
  //       (error) => {
  //         console.log(error.text);
  //       }
  //     );
  // };

  return (
    <>
      <div className="contact-container">
        {/* <div class="container"> */}
        <div className="card">
          <div className="left">
            <img src={photo} />
          </div>
          <div className="right">
            <h2>Contact Us</h2>
            <div className="contact">
              <div className="form-container">
                <form ref={form} onSubmit={sendEmail} className="form">
                  <div className="username">
                    <input
                      type="text"
                      placeholder="Enter your Name"
                      name="from_name"
                    />
                  </div>
                  <div className="useremail">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      name="userEmail"
                      required
                    />
                  </div>
                  <div className="usermessage">
                    <textarea
                      placeholder="Enter your message"
                      name="message"
                      required
                    ></textarea>
                  </div>
                  <div className="usersubmit">
                    <input type="submit" value="Submit" />
                  </div>
                </form>
              </div>
              <div className="address">
                <div className="email">
                  <h4>Reach us through here!</h4>
                  <p>infoflowsup@gmail.com</p>
                </div>
                <div className="location">
                  <h4>Based in</h4>
                  <p>
                    Kaunas,
                    <br />
                    Lithuania
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default transition(Contact);
