import transition from "../transition";
import photo from "../assets/About/newspaper-black-and-white-recording-wallpapper.jpg";
import "../css/contact.css";

const Contact = () => {
  return (
    <>
      <div className="contact-container">
        {/* <div class="container"> */}
        <div class="card">
          <div class="left">
            <img src={photo} />
          </div>
          <div class="right">
            <h2>Contact Us</h2>
            <div class="contact">
              <div class="form-container">
                <form class="form">
                  <div class="username">
                    <input type="text" placeholder="Enter your Name" />
                  </div>
                  <div class="useremail">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div class="usermessage">
                    <textarea
                      placeholder="Enter your message"
                      required
                    ></textarea>
                  </div>
                  <div class="usersubmit">
                    <input type="submit" value="Contact Us" />
                  </div>
                </form>
              </div>
              <div class="address">
                <div class="email">
                  <h4>Reach us through here!</h4>
                  <p>infoflow@support.com</p>
                </div>
                <div class="location">
                  <h4>Based in</h4>
                  <p>
                    Los Angeles,
                    <br />
                    California
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
