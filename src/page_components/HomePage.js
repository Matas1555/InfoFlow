import SideBar from "./SideBar";
import NavBar from "./NavBar";
import ReactionButtons from "../page_components/Reaction_buttons";
import { useEffect, useState } from "react";
import { useInView } from "react-hook-inview";

import "../css/homePage.css";
import "../css/comments.css";
import defaultProfileFT from "../assets/default_profile.png";

import { database } from "../App";
import { db } from "../App";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import transition from "../transition";
import { motion } from "framer-motion";

const { v4: uuidv4 } = require("uuid");
// import ScrollContainer from "./ScrollContainer";

const pageVariants = {
  initial: {
    opacity: 0,
    x: "100vh",
    scale: 0.8,
  },
  in: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  out: {
    opacity: 0,
    x: "-100vh",
    scale: 1.2,
  },

  sidebarInitial: {
    opacity: 0,
    x: "0vh",
    scale: 1,
  },
  sidebarIn: {
    opacity: 1,
    x: "0vh",
    scale: 1,
  },
  sidebarOut: {
    opacity: 0,
    x: "0vh",
    scale: 1,
  },
};

const pageTransition = {
  duration: 0.6,
  type: "linear",
  ease: "anticipate",
};

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [articleCategory, setArticleCategory] = useState("general");
  const [articleLanguage, setArticleCLanguage] = useState("us");
  const [isCommentWindowVisible, setCommentWindowVisible] = useState(false);

  //Code has two fetch article functions, one fetches articles from the "top-headlines" endpoint, the other one fetches from "everything" endpoint.
  //Top headlines function is more usable, contains better articles
  const fetchTopArticles = async (country, category, withHistory) => {
    const apiKey = "2a797461e90448799c9c602abb432b4f";
    console.log("Fetching news...");
    // Define query parameters for "top-headlines" endpoint
    var url =
      "https://newsapi.org/v2/top-headlines?" +
      "category=" +
      category +
      "&country=" +
      country +
      "&pageSize=100" +
      "from=" +
      Date.now() +
      "to=" +
      Date.now() +
      "&apiKey=" +
      apiKey;

    // Fetch the data from the API
    // var req = new Request(url);
    // let a = await fetch(req);
    // let response = await a.json();

    //Uncomment if you get response.articles is undifined error
    let response = [];
    response.articles = [];

    // for (let article of response.articles) {
    //   const date = article.datePublished; // get the date

    //   const id = uuidv4();

    //   // // Create a new document for the date in the articles collection
    //   // const dateRef = doc(collection(db, "articles"));
    //   // console.log(dateRef);

    //   // // Check if the document already exists
    //   // const doc = await dateRef.get();

    //   // // Create a new subcollection for the articles and add the article to it
    //   // const articleRef = dateRef.collection("articles").doc(id);
    //   // articleRef.set(article);
    // }

    // response.articles.forEach(async (article, index) => {
    //   await setDoc(doc(db, "articleExample", `article${index}`), article);
    // });

    //Remove all articles that are empty
    let filteredArticles = response.articles.filter(
      (article) => article.title !== "[Removed]"
    );

    // Remove duplicate articles based on URL
    filteredArticles = filteredArticles.filter(
      (article, index, self) =>
        index === self.findIndex((t) => t.url === article.url)
    );

    //Depending on the situation, we can choose if the user can view articles that they scrolled by before
    if (withHistory) {
      setArticles((prevArticles) => [...prevArticles, ...filteredArticles]);
    } else {
      setArticles(filteredArticles);
    }
    console.log(response);
  };

  // const fetchArticles = async (keywords, language) => {
  //   const apiKey = "2a797461e90448799c9c602abb432b4f";
  //   const today = new Date();
  //   const twoDaysAgo = new Date();
  //   twoDaysAgo.setDate(today.getDate() - 2);

  //   // Converts the dates to 'YYYY-MM-DD' format
  //   //This is used for the API call so it recognizes from what date to search for articles
  //   const formatDate = (date) => {
  //     const year = date.getFullYear();
  //     const month = String(date.getMonth() + 1).padStart(2, "0");
  //     const day = String(date.getDate()).padStart(2, "0");
  //     return `${year}-${month}-${day}`;
  //   };

  //   const todayISO = formatDate(today);
  //   const twoDaysAgoISO = formatDate(twoDaysAgo);

  //   console.log("Fetching news...");
  //   // Define query parameters for "everything" endpoint
  //   var url =
  //     "https://newsapi.org/v2/everything?" +
  //     "q=" +
  //     keywords +
  //     "&from=" +
  //     twoDaysAgoISO +
  //     "&language=" +
  //     language +
  //     "&sortBy=popularity&" +
  //     "pageSize=100&" +
  //     "apiKey=" +
  //     apiKey +
  //     `&timestamp=${Date.now()}`; // Add a timestamp to the query

  //   var req = new Request(url);

  //   // Fetch the data from the API
  //   let a = await fetch(req);
  //   let response = await a.json();
  //   setArticles((prevArticles) => [...prevArticles, ...response.articles]);
  //   console.log(response);

  //   //Example how to acquire information from the fetches array of articles
  //   //response.articles[0].title;
  //   //response.articles[0].image;
  // };

  //handles the string that was passed from sidebar.js
  //uses the category in article fetching
  const handleCategoryChange = async (category) => {
    setArticleCategory(category);
    fetchTopArticles("us", category, false); // Fetch new articles with the updated category
    console.log(category);
  };

  const handleLanguageChange = async (language) => {
    setArticleCLanguage(language);
    fetchTopArticles(language, articleCategory, false);
    console.log(language);
  };

  const handleCommentWindowClose = () => {
    setCommentWindowVisible(false);
  };

  useEffect(() => {
    fetchTopArticles("us", articleCategory, false);
  }, []);

  function ScrollContainer() {
    const [ref, isVisible] = useInView({
      threshold: 0.2,
    });

    const loadMoreArticles = () => {
      setPage(page + 1);
      fetchTopArticles(articleLanguage, articleCategory, true);
    };

    useEffect(() => {
      if (isVisible) {
        loadMoreArticles();
      }
    }, [isVisible]);

    return (
      <>
        {/* <div className="background-container"> */}
        <div className="whole-container">
          <div className="List">
            {articles.map((article, index) => (
              <a
                href={article.url} // Set the URL from the article data
                target="_blank" // Opens the link in a new tab
                key={index}
                className="ClickableContainer"
              >
                {/* <div
                className={`${
                  article.urlToImage ? "WithImage" : "WithoutImage"
                }`}
                key={index}
              > */}
                <div className="Item" key={index}>
                  <div className="ImageContainer">
                    <img
                      src={article.urlToImage}
                      alt={article.description}
                      className="ResponsiveImage"
                    />
                  </div>
                  <div className="articleInfo">
                    <h1 className="article-author">{article.author}</h1>
                    <h2 className="article-title">{article.title}</h2>
                    <div className="article-bottom">
                      <h1 className="article-source">{article.source.name}</h1>
                      <h1 className="article-publishedAt">
                        {
                          new Date(article.publishedAt)
                            .toISOString()
                            .split("T")[0]
                        }
                      </h1>
                    </div>
                  </div>
                </div>

                {/* </div> */}
              </a>
            ))}

            <div className="Loader" ref={ref}>
              <i className="fa fa-spinner fa-spin fa-2x fa-fw"></i>
            </div>
          </div>
          <ReactionButtons setCommentWindowVisible={setCommentWindowVisible} />
        </div>
        {isCommentWindowVisible && (
          <div className="main_comment-window">
            <button
              onClick={handleCommentWindowClose}
              className="close-window-button"
            >
              <b>X</b>
            </button>
            <div className="comment-content">
              <div className="scrolling-comments">
                <div className="show-comments">
                  <img
                    className="other-user-profileft"
                    src={defaultProfileFT}
                  ></img>
                  <div className="other-user-comments">
                    <p className="comment-username">Username</p>
                    <p className="users-comment">
                      This is a commentThis is a comment This is a comment This
                      is a comment
                    </p>
                  </div>
                </div>
                <div className="show-comments">
                  <img
                    className="other-user-profileft"
                    src={defaultProfileFT}
                  ></img>
                  <div className="other-user-comments">
                    <p className="comment-username">Username</p>
                    <p className="users-comment">
                      This is a commentThis is a comment This is a comment This
                      is a comment
                    </p>
                  </div>
                </div>
                <div className="show-comments">
                  <img
                    className="other-user-profileft"
                    src={defaultProfileFT}
                  ></img>
                  <div className="other-user-comments">
                    <p className="comment-username">Username</p>
                    <p className="users-comment">
                      This is a commentThis is a comment This is a comment This
                      is a comment
                    </p>
                  </div>
                </div>
                <div className="show-comments">
                  <img
                    className="other-user-profileft"
                    src={defaultProfileFT}
                  ></img>
                  <div className="other-user-comments">
                    <p className="comment-username">Username</p>
                    <p className="users-comment">
                      This is a commentThis is a comment This is a comment This
                      is a comment
                    </p>
                  </div>
                </div>
              </div>
              <div className="user-comment-input">
                <input
                  id="comment"
                  type="text"
                  className="input-comment-field"
                  name="comment"
                />
                <input
                  type="submit"
                  // onClick={() => handleLogIn()}
                  className="submit-comment-button"
                  value="Comment"
                />
              </div>
            </div>
          </div>
        )}
        {/* </div> */}
      </>
    );
  }

  return (
    <>
      {/* <NavBar onLanguageChange={handleLanguageChange} /> */}
      <div className="HomePageContainer">
        <motion.div
          initial="sidebarInitial"
          animate="sidebarIn"
          exit="sidebarOut"
          variants={pageVariants}
          transition={pageTransition}
        >
          <SideBar onCategoryChange={handleCategoryChange} />
        </motion.div>

        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          {ScrollContainer()}
        </motion.div>
      </div>
    </>
  );
};

export default HomePage;
