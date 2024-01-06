import "../css/reaction_buttons.css";
import { useState, useEffect } from "react";
import {
  updateDoc,
  setDoc,
  deleteDoc,
  doc,
  increment,
  documentId,
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db, auth } from "../firebaseConfig";

const ReactionButtons = ({
  articles,
  currentIndex,
  articleURL,
  date,
  category,
  hasLiked,
  hasDisliked,
  comments,
  setCommentWindowVisible,
  newArticleInfo,
}) => {
  const [likePressed, setLikePressed] = useState(hasLiked);
  const [dislikePressed, setDislikePressed] = useState(hasDisliked);
  const [currentLikes, setLikes] = useState(0);
  const [currentDislikes, setDislikes] = useState(0);
  const [currentArticles, setArticles] = useState([]);
  const [currentCategory, setCategory] = useState("");
  const [currentDate, setDate] = useState(new Date());

  useEffect(() => {
    setDate(date.toISOString().split("T")[0]);
    setArticles(articles);
    setCategory(category);
  }, [
    currentLikes,
    currentDislikes,
    date,
    articleURL,
    articles,
    category,
    newArticleInfo,
  ]);

  const fetchLikesAndDislikesCount = async (articleID) => {
    const articleInteractionRef = collection(db, "articleInteraction");
    const q = query(
      articleInteractionRef,
      where("article_id", "==", articleID)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let likes = 0;
      let dislikes = 0;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.type === "like") {
          likes++;
        } else if (data.type === "dislike") {
          dislikes++;
        }
      });

      setLikes(likes);
      setDislikes(dislikes);

      const docRef = doc(
        db,
        "articles",
        currentDate,
        currentCategory,
        articleID
      );
      updateDoc(docRef, { likes: likes });
      updateDoc(docRef, { dislikes: dislikes });
      articles[currentIndex].likes = likes;
      articles[currentIndex].dislikes = dislikes;
    });
    setArticles(articles);
    newArticleInfo(articles);
    return unsubscribe;
  };

  const saveLikeOrDislike = async (articleID, auth, type) => {
    const timestamp = new Date();
    const userId = auth.currentUser.uid;
    const customDocId = `${articleID}_${userId}`;

    const articleInteractionRef = collection(db, "articleInteraction");
    const docRef = doc(articleInteractionRef, customDocId);

    try {
      const docSnapshot = await getDocs(
        query(
          articleInteractionRef,
          where("article_id", "==", articleID),
          where("user_id", "==", userId),
          where("type", "==", type)
        )
      );

      if (docSnapshot.size > 0) {
        // User has already liked or disliked, delete the record
        const docToDelete = doc(articleInteractionRef, customDocId);
        await deleteDoc(docToDelete);
        console.log(`Like/Dislike deleted with ID: ${customDocId}`);
        articles[currentIndex].hasLiked = false;
        articles[currentIndex].hasDisliked = false;
        setLikePressed(false);
        setDislikePressed(false);
      } else {
        // User hasn't liked or disliked yet, add a new record
        await setDoc(docRef, {
          user_id: userId,
          article_id: articleID,
          type: type, // 'like' or 'dislike'
          data: timestamp,
        });
        if (type === "like") {
          articles[currentIndex].hasLiked = true;
        }
        if (type === "dislike") {
          articles[currentIndex].hasDisliked = true;
        }
        console.log(`Like/Dislike added with ID: ${customDocId}`);
      }
      setArticles(articles);
      newArticleInfo(articles);
    } catch (error) {
      console.error("Error adding/deleting like/dislike: ", error);
    }
  };

  const handleLike = async () => {
    let articleID = articleURL.replace(/\//g, "_");
    setLikePressed(true);
    setDislikePressed(false); // Reset the dislike state
    saveLikeOrDislike(articleID, auth, "like");
    fetchLikesAndDislikesCount(articleID);
  };

  const handleDislike = () => {
    let articleID = articleURL.replace(/\//g, "_");
    setDislikePressed(true);
    setLikePressed(false); // Reset the like state
    saveLikeOrDislike(articleID, auth, "dislike");
  };

  const handleComment = () => {
    setCommentWindowVisible(true);
  };

  const handleShare = () => {
    // Handle the share action
    console.log("Share");
  };

  return (
    <div className="ReactionButtons-container">
      <div className="reaction-button-text">
        <button
          className={`ReactionButtons ${likePressed ? "invert" : ""}`}
          onClick={handleLike}
        >
          <i className="fa fa-thumbs-up" aria-hidden="true"></i>
        </button>
        <p className="likes-text">{currentLikes}</p>
      </div>
      <div className="reaction-button-text">
        <button
          className={`ReactionButtons ${dislikePressed ? "invert" : ""}`}
          onClick={handleDislike}
        >
          <i className="fa fa-thumbs-down" aria-hidden="true"></i>
        </button>
        <p className="likes-text">{currentDislikes}</p>
      </div>
      <div className="reaction-button-text">
        <button className="ReactionButtons" onClick={handleComment}>
          <i className="fa fa-comment" aria-hidden="true"></i>
        </button>
        <p className="likes-text">{comments}</p>
      </div>
      <div>
        <button className="ReactionButtons" onClick={handleShare}>
          <i className="fa fa-share-alt" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
};

export default ReactionButtons;
