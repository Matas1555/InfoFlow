import "../css/about.css";
import splatter1 from "../assets/About/Untitled-1.png";
import banner from "../assets/About/ktu.edu-baneriai_Bendrinis-1140x400-1.jpg";
import transition from "../transition";

import { motion } from "framer-motion";
import { useEffect } from "react";

const pageVariantsAboutPage = {
  initial: {
    opacity: 0,
    y: "100%",
    scale: 1,
  },
  in: {
    opacity: 1,
    y: 1,
    scale: 1,
  },
  out: {
    opacity: 0,
    y: "100%",
    scale: 0.8,
  },
};

const pageTransition = {
  duration: 0.6,
  type: "linear",
  ease: "easeIn",
};

const About = () => {
  const allowScrolling = true;

  useEffect(() => {
    document.body.style.overflowY = allowScrolling ? "scroll" : "hidden";
  }, []);

  return (
    <>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariantsAboutPage}
        transition={pageTransition}
      >
        <section className="page-section" id="about">
          <div className="container-about">
            <div className="text-center">
              <h2 className="section-heading text-uppercase">About</h2>
              <h3 className="section-subheading text-muted">
                "Quick news for you"
              </h3>
            </div>
            <ul className="timeline">
              <li>
                {/* <div class="timeline-image-container"></div> */}
                <div className="timeline-panel">
                  <div className="timeline-heading">
                    <h4 className="subheading">Our Goal</h4>
                  </div>
                  <div className="timeline-body">
                    <p className="text-muted">
                      At InfoFlow, our primary goal is to revolutionize the
                      news-reading experience for the modern generation. We
                      understand that in an era dominated by fast-paced
                      lifestyles, concise and visually appealing content is key.
                      By leveraging the immersive nature of article-based
                      storytelling, we aim to bridge the gap between traditional
                      journalism and the rapidly changing habits of digital
                      natives.
                    </p>
                  </div>
                </div>
              </li>
              <li className="timeline-inverted">
                <div className="timeline-image"></div>
                <div className="timeline-panel">
                  <div className="timeline-heading">
                    <h4 className="subheading">What Sets Us Apart</h4>
                  </div>
                  <div className="timeline-body">
                    <p className="text-muted">
                      Unlike conventional news outlets, we recognize the
                      importance of merging information with entertainment. Our
                      articles are crafted not just to inform but to captivate,
                      ensuring that our readers are not only well-informed but
                      also thoroughly engaged. Whether you're a student trying
                      to stay updated on current events or a professional
                      seeking a quick yet comprehensive news fix, InfoFlow is
                      your go-to destination.
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="timeline-image"></div>
                <div className="timeline-panel">
                  <div className="timeline-heading">
                    <h4 className="subheading">Empowering Voices</h4>
                  </div>
                  <div className="timeline-body">
                    <p className="text-muted">
                      In our pursuit of delivering diverse and thought-provoking
                      content, we are committed to providing a platform for
                      emerging writers, journalists, and opinion leaders. We
                      believe in the power of diverse perspectives, and our
                      contributors play a crucial role in shaping the narrative
                      on InfoFlow. By amplifying voices from various
                      backgrounds, we aim to create a space where the rich
                      tapestry of human experiences is reflected and celebrated.
                    </p>
                  </div>
                </div>
              </li>

              <li className="timeline-inverted">
                <div className="timeline-image"></div>
                <div className="timeline-panel">
                  <div className="timeline-heading">
                    <h4 className="subheading">Join Us on the Journey</h4>
                  </div>
                  <div className="timeline-body">
                    <p className="text-muted">
                      As we navigate the ever-evolving digital landscape, we
                      invite you to join us on this exciting journey. Explore
                      the world of news through a lens that values both
                      substance and style. At InfoFlow, we envision a future
                      where staying informed is not only effortless but also an
                      enjoyable experience. Thank you for being a part of our
                      community, and we look forward to bringing you the news in
                      a way that resonates with the dynamic spirit of our times.
                    </p>
                  </div>
                </div>
              </li>

              <li className="timeline-inverted">
                <div className="timeline-image"></div>
              </li>
            </ul>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default About;
