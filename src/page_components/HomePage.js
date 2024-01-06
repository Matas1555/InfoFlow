import SideBar from "./SideBar";
import NavBar from "./NavBar";
import ReactionButtons from "../page_components/Reaction_buttons";
import { useEffect, useState } from "react";
import { useInView } from "react-hook-inview";
import "../css/reaction_buttons.css";

import "../css/homePage.css";
import "../css/comments.css";
import defaultProfileFT from "../assets/default_profile.png";
import profile1 from "../assets/profileft/images.jpg";
import profile2 from "../assets/profileft/images (1).jpg";
import profile3 from "../assets/profileft/images (2).jpg";

import { realtimeDatabase, db, auth } from "../firebaseConfig";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { getDatabase, ref, get } from "firebase/database";
import {
  where,
  deleteDoc,
  setDoc,
  collection,
  getDocs,
  query,
  increment,
} from "firebase/firestore";

import transition from "../transition";
import { motion } from "framer-motion";

import {
  fetchArticlesFromDatabase,
  fetchTopArticles,
  fetchUserInteraction,
} from "./fetchArticles";

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
  const [commentUsers, setCommentUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [date, setArticleDate] = useState(new Date());
  const allowScrolling = false;

  //Create a date variable
  // const today = new Date();
  // const yesterday = new Date(today);
  // yesterday.setDate(today.getDate() - 1);
  // setArticleDate(yesterday.toISOString().split("T")[0]);

  //handles the string that was passed from sidebar.js
  //uses the category in article fetching
  const handleCategoryChange = async (category) => {
    const today = new Date();
    const dayBefore = new Date(today);
    dayBefore.setDate(today.getDate() - 2);
    setArticleDate(dayBefore);
    const yesterday = dayBefore.toISOString().split("T")[0];
    setArticleCategory(category);
    fetchArticlesFromDatabase(yesterday, category).then((articles) => {
      setArticles(articles);
    });
    console.log(category);
  };

  const handleLanguageChange = async (language) => {
    const today = new Date();
    const dayBefore = new Date(today);
    dayBefore.setDate(today.getDate() - 2);
    setArticleDate(dayBefore);
    const yesterday = dayBefore.toISOString().split("T")[0];
    setArticleCLanguage(language);
    fetchTopArticles(language, articleCategory, yesterday).then((articles) => {
      console.log(articles);
      setArticles(articles);
    });
    console.log(language);
  };

  const handleCommentWindowClose = () => {
    setCommentWindowVisible(false);
  };

  const handleCommentWindowOpen = () => {
    setCommentWindowVisible(true);
  };

  const fetchUserData = async (userID) => {
    const userRef = ref(realtimeDatabase, `users/${userID}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      throw new Error(`No user found with ID ${userID}`);
    }
  };

  useEffect(() => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 2);
    setArticleDate(yesterday);
    setCurrentIndex(0);

    document.body.style.overflowY = allowScrolling ? "scroll" : "hidden";
  }, []);

  useEffect(() => {
    if (articles[currentIndex]?.comments) {
      const fetchCommentsData = async () => {
        const users = await Promise.all(
          Object.entries(articles[currentIndex]?.comments).map(([userID]) =>
            fetchUserData(userID)
          )
        );
        setCommentUsers(users);
      };
      fetchCommentsData();
    }
  }, [currentIndex, articles]);

  function ScrollContainer() {
    const [ref, isVisible] = useInView({
      threshold: 0.2,
    });

    // --------------------------CODE FOR REACTION BUTTONS--------------------------------
    const [likePressed, setLikePressed] = useState(false);
    const [dislikePressed, setDislikePressed] = useState(false);

    const handleLike = (index, article) => {
      let articleID = article.url.replace(/\//g, "_");
      // setLikePressed((a) => !a);
      // setDislikePressed(false); // Reset the dislike state

      setArticles((currentArticles) => {
        return currentArticles.map((article, i) => {
          if (i === index) {
            // Toggle the liked state of the article
            let newLikes = article.likes;
            let newDislikes = article.dislikes;

            if (article.userHasLiked) {
              newLikes--; // If already liked, decrement likes
            } else {
              newLikes++; // If not liked, increment likes
            }

            if (article.userHasDisliked) {
              newDislikes--;
            }

            const updatedArticle = {
              ...article,
              likes: newLikes,
              dislikes: newDislikes,
              userHasLiked: !article.userHasLiked,
              userHasDisliked: false,
            };
            return updatedArticle;
          }
          return article;
        });
      });
      saveLikeOrDislike(articleID, auth, "like");
      // fetchLikesAndDislikesCount(articleID);
    };

    const handleDislike = (index, article) => {
      let articleID = article.url.replace(/\//g, "_");
      // setDislikePressed((a) => !a);
      // setLikePressed(false); // Reset the like state

      setArticles((articles) => {
        return articles.map((article, i) => {
          if (i === index) {
            // Toggle the liked state of the article
            let newLikes = article.likes;
            let newDislikes = article.dislikes;

            if (article.userHasDisliked) {
              newDislikes--; // If already disliked, decrement dislikes
            } else {
              newDislikes++;
            }

            if (article.userHasLiked) {
              newLikes--;
            }

            const updatedArticle = {
              ...article,
              likes: newLikes,
              dislikes: newDislikes,
              userHasDisliked: !article.userHasDisliked,
              userHasLiked: false,
            };
            return updatedArticle;
          }
          return article;
        });
      });
      saveLikeOrDislike(articleID, auth, "dislike");
    };

    const handlePostComment = (index) => {
      const articleID = articles[index].url.replace(/\//g, "_");
      const commentValue = document.getElementById("comment").value;
      const user = auth.currentUser;

      if (commentValue.lenght === 0) {
        return;
      }

      if (user) {
        setArticles((articles) => {
          return articles.map((article, i) => {
            if (i === index) {
              const comments = article.comments || {};
              const updatedArticle = {
                ...comments,
                [user.uid]: commentValue,
              };
              return { ...article, comments: updatedArticle };
            }
            return article;
          });
        });
      } else {
        alert("Only logged in users can post a comment!");
      }

      uploadCommentToDatabase(articleID, commentValue);

      document.getElementById("comment").value = "";
    };

    const uploadCommentToDatabase = async (articleID, comment) => {
      const docRef = doc(
        db,
        "articles",
        date.toISOString().split("T")[0],
        articleCategory,
        articleID
      );
      const user = auth.currentUser;

      if (user) {
        await updateDoc(docRef, {
          comments: { [`${user.uid}`]: comment },
        });
      } else {
        alert("You cannot post a comment");
      }
    };

    const saveLikeOrDislike = async (articleID, auth, type) => {
      const timestamp = new Date();
      const userId = auth.currentUser.uid;
      const customDocId = `${articleID}_${userId}`;

      const articleInteractionRef = collection(db, "articleInteraction");
      const docRef = doc(articleInteractionRef, customDocId);

      const articleRef = doc(
        db,
        "articles",
        date.toISOString().split("T")[0],
        articleCategory,
        articleID
      );
      console.log(date);

      try {
        const docSnapshot = await getDocs(
          query(
            articleInteractionRef,
            where("article_id", "==", articleID),
            where("user_id", "==", userId)
          )
        );

        if (docSnapshot.size > 0) {
          const existingDocData = docSnapshot.docs[0].data();
          const docToDelete = doc(articleInteractionRef, customDocId);
          if (type === "dislike" && existingDocData.type === "like") {
            await setDoc(docRef, {
              user_id: userId,
              article_id: articleID,
              type: type, // 'like' or 'dislike'
              data: timestamp,
            });
            updateDoc(articleRef, {
              likes: increment(-1),
              dislikes: increment(1),
            });
          } else if (type === "like" && existingDocData.type === "dislike") {
            await setDoc(docRef, {
              user_id: userId,
              article_id: articleID,
              type: type, // 'like' or 'dislike'
              data: timestamp,
            });
            updateDoc(articleRef, {
              likes: increment(1),
              dislikes: increment(-1),
            });
          } else if (type === "like" && existingDocData.type === "like") {
            await deleteDoc(docToDelete);
            updateDoc(articleRef, { likes: increment(-1) });
          } else if (type === "dislike" && existingDocData.type === "dislike") {
            await deleteDoc(docToDelete);
            updateDoc(articleRef, { dislikes: increment(-1) });
          }
        } else {
          await setDoc(docRef, {
            user_id: userId,
            article_id: articleID,
            type: type, // 'like' or 'dislike'
            data: timestamp,
          });
          if (type === "like") {
            updateDoc(articleRef, { likes: increment(1) });
          } else if (type === "dislike") {
            updateDoc(articleRef, { dislikes: increment(1) });
          }
        }
      } catch (error) {
        console.error("Error adding/deleting like/dislike: ", error);
      }
    };

    // --------------------------CODE FOR REACTION BUTTONS--------------------------------

    const loadMoreArticles = () => {
      const yesterday = date.toISOString().split("T")[0];
      console.log(yesterday);
      setPage(page + 1);

      fetchArticlesFromDatabase(yesterday, articleCategory)
        .then((filteredArticles) => {
          console.log("These are the articles: ", filteredArticles);
          setArticles((prevArticles) => [...prevArticles, ...filteredArticles]);

          window.scrollTo({ top: 0, behavior: "smooth" });
        })
        .catch((error) => {
          console.log(error.message);
        });

      // if (articles.length === 0) {
      //   fetchTopArticles(articleLanguage, articleCategory, yesterday)
      //     .then((object) => {
      //       console.log(object);
      //       setArticles(articles);
      //     })
      //     .catch((error) => {
      //       console.log(error.message);
      //     });
      // }

      date.setDate(date.getDate() - 1);
      setArticleDate(date);
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
              <div>
                {/* <div
                className={`${
                  article.urlToImage ? "WithImage" : "WithoutImage"
                }`}
                key={index}
              > */}
                <div className="Item" key={index}>
                  <a
                    href={article.url} // Set the URL from the article data
                    target="_blank" // Opens the link in a new tab
                    key={index}
                    className="ClickableContainer"
                    onMouseEnter={() => setCurrentIndex(index)}
                    onMouseLeave={() => setCurrentIndex(index)}
                  >
                    <div className="main-article-window">
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
                          <h1 className="article-source">{article.source}</h1>
                          <h1 className="article-publishedAt">
                            {article.publishedAt}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </a>
                  <div className="ReactionButtons-container">
                    <div className="reaction-button-text">
                      <button
                        className={`ReactionButtons ${
                          article.userHasLiked ? "invert" : ""
                        }`}
                        onClick={() => handleLike(index, article)}
                      >
                        <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                      </button>
                      <p className="likes-text">{article.likes}</p>
                    </div>
                    <div className="reaction-button-text">
                      <button
                        className={`ReactionButtons ${
                          article.userHasDisliked ? "invert" : ""
                        }`}
                        onClick={() => handleDislike(index, article)}
                      >
                        <i className="fa fa-thumbs-down" aria-hidden="true"></i>
                      </button>
                      <p className="likes-text">{article.dislikes}</p>
                    </div>
                    <div
                      className="reaction-button-text"
                      onClick={handleCommentWindowOpen}
                    >
                      <button className="ReactionButtons">
                        <i className="fa fa-comment" aria-hidden="true"></i>
                      </button>
                      <p className="likes-text">
                        {Object.keys(article.comments).length}
                      </p>
                    </div>
                    <div>
                      <button className="ReactionButtons">
                        <i className="fa fa-share-alt" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                </div>

                {/* </div> */}
              </div>
            ))}

            <div className="Loader" ref={ref}>
              <i className="fa fa-spinner fa-spin fa-2x fa-fw"></i>
            </div>
          </div>
        </div>

        {/* --------------------- COMMENT WINDOW -------------------------------------*/}
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
                {articles[currentIndex] &&
                  articles[currentIndex]?.comments &&
                  Object.entries(articles[currentIndex]?.comments).map(
                    ([userID, comment], index) => {
                      const username = commentUsers[index]?.username;
                      return (
                        <div className="show-comments" key={index}>
                          <img
                            className="other-user-profileft"
                            src={defaultProfileFT}
                          ></img>
                          <div className="other-user-comments">
                            <p className="comment-username">{username}</p>
                            <p className="users-comment">{comment}</p>
                          </div>
                        </div>
                      );
                    }
                  )}
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
                  onClick={() => handlePostComment(currentIndex)}
                  className="submit-comment-button"
                  value="Comment"
                />
              </div>
            </div>
          </div>
        )}
        {/* --------------------- COMMENT WINDOW -------------------------------------*/}
        {/* </div> */}
      </>
    );
  }

  return (
    <>
      {/* <NavBar onLanguageChange={handleLanguageChange} /> */}
      <div
        className="HomePageContainer"
        style={{ overflowY: allowScrolling ? "scroll" : "hidden" }}
      >
        <motion.div
          initial="sidebarInitial"
          animate="sidebarIn"
          exit="sidebarOut"
          variants={pageVariants}
          transition={pageTransition}
        >
          <SideBar
            onCategoryChange={handleCategoryChange}
            onCountryChange={handleLanguageChange}
          />
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
