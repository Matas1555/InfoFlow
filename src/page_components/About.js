import "../css/about.css";
import splatter1 from "../assets/About/Untitled-1.png";
import banner from "../assets/About/ktu.edu-baneriai_Bendrinis-1140x400-1.jpg";

export default function About() {
  return (
    <>
      <section class="page-section" id="about">
        <div class="container-about">
          <div class="text-center">
            <h2 class="section-heading text-uppercase">About</h2>
            <h3 class="section-subheading text-muted">"Quick news for you"</h3>
          </div>
          <ul class="timeline">
            <li>
              {/* <div class="timeline-image-container"></div> */}
              <div class="timeline-panel">
                <div class="timeline-heading">
                  <h4 class="subheading">Our Goal</h4>
                </div>
                <div class="timeline-body">
                  <p class="text-muted">
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
            <li class="timeline-inverted">
              <div class="timeline-image"></div>
              <div class="timeline-panel">
                <div class="timeline-heading">
                  <h4 class="subheading">What Sets Us Apart</h4>
                </div>
                <div class="timeline-body">
                  <p class="text-muted">
                    Unlike conventional news outlets, we recognize the
                    importance of merging information with entertainment. Our
                    articles are crafted not just to inform but to captivate,
                    ensuring that our readers are not only well-informed but
                    also thoroughly engaged. Whether you're a student trying to
                    stay updated on current events or a professional seeking a
                    quick yet comprehensive news fix, InfoFlow is your go-to
                    destination.
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div class="timeline-image"></div>
              <div class="timeline-panel">
                <div class="timeline-heading">
                  <h4 class="subheading">Empowering Voices</h4>
                </div>
                <div class="timeline-body">
                  <p class="text-muted">
                    In our pursuit of delivering diverse and thought-provoking
                    content, we are committed to providing a platform for
                    emerging writers, journalists, and opinion leaders. We
                    believe in the power of diverse perspectives, and our
                    contributors play a crucial role in shaping the narrative on
                    InfoFlow. By amplifying voices from various backgrounds, we
                    aim to create a space where the rich tapestry of human
                    experiences is reflected and celebrated.
                  </p>
                </div>
              </div>
            </li>

            <li class="timeline-inverted">
              <div class="timeline-image"></div>
              <div class="timeline-panel">
                <div class="timeline-heading">
                  <h4 class="subheading">What Sets Us Apart</h4>
                </div>
                <div class="timeline-body">
                  <p class="text-muted">
                    As we navigate the ever-evolving digital landscape, we
                    invite you to join us on this exciting journey. Explore the
                    world of news through a lens that values both substance and
                    style. At InfoFlow, we envision a future where staying
                    informed is not only effortless but also an enjoyable
                    experience. Thank you for being a part of our community, and
                    we look forward to bringing you the news in a way that
                    resonates with the dynamic spirit of our times.
                  </p>
                </div>
              </div>
            </li>

            <li class="timeline-inverted">
              <div class="timeline-image"></div>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
