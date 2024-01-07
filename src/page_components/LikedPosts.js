import defaultProfilePhoto from "../assets/default_profile.png";
import "../css/likedposts.css";
import transition from "../transition";
import Spinner from "react-svg-spinner";
import {
  collection,
  addDoc,
  writeBatch,
  doc,
  getDocs,
  query,
  where,
  onSnapshot,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "../firebaseConfig";

import { useEffect, useState } from "react";

function LikedPosts() {
  const [articles, setArticles] = useState([]);
  const [isFetching, setFetching] = useState(true);
  const user = auth.currentUser;
  const allowScrolling = true;

  useEffect(() => {
    function isEmpty(value) {
      return (
        value == null ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }

    const fetchLikedArticles = async () => {
      let articlesIDs = [];
      let articles = [];

      let collectionRef = collection(db, "articleInteraction");
      const q = query(
        collectionRef,
        where("user_id", "==", user.uid),
        where("type", "==", "like")
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (
          !isEmpty(data.article_id) ||
          !isEmpty(data.article_category) ||
          !isEmpty(data.article_date)
        ) {
          const article = {
            articleID: data.article_id,
            articleCategory: data.article_category,
            articleDate: data.article_date,
          };
          articlesIDs.push(article);
        }
      });

      for (let i = 0; i < articlesIDs.length; i++) {
        const articleRef = doc(
          db,
          "articles",
          articlesIDs[i].articleDate,
          articlesIDs[i].articleCategory,
          articlesIDs[i].articleID
        );
        const articleSnapshot = await getDoc(articleRef);
        if (articleSnapshot.exists()) {
          articles.push(articleSnapshot.data());
        }
      }

      return articles;
    };

    document.body.style.overflowY = allowScrolling ? "scroll" : "hidden";

    fetchLikedArticles().then((fetchedArticles) => {
      setArticles(fetchedArticles); // Set the articles state here
      setFetching(false);
      console.log(articles);
    });
  }, []);

  return (
    <>
      <div className="liked-post-container">
        {articles.map((article, index) => {
          return (
            <div className="likes-post-box" key={index}>
              <a href={article.url} target="_blank" key={index}>
                <div className="picture-and-info">
                  <div className="image-container">
                    <img className="source-image" src={article.urlToImage} />
                  </div>
                  <div className="article-information">
                    <h1 className="liked-article-title">{article.title}</h1>
                    <h1 className="liked-article-author">
                      {" "}
                      {article.author} / {article.publishedAt}
                    </h1>
                    <h2 className="liked-article-desc">
                      {" "}
                      {article.description}
                    </h2>
                    <h1 className="liked-article-source">{article.source}</h1>
                  </div>
                </div>
              </a>
            </div>
          );
        })}
        ;
        <div className="Loader">
          ({isFetching && <Spinner color="black" size="64px" thickness={4} />})
        </div>
      </div>
    </>
  );
}

export default transition(LikedPosts);
