import "../css/reaction_buttons.css";
import { useState } from "react";

const ReactionButtons = ({ setCommentWindowVisible }) => {
  const handleLike = () => {
    // Handle the like action
    console.log("Liked!");
  };

  const handleDislike = () => {
    // Handle the dislike action
    console.log("Disliked!");
  };
  const handleComment = () => {
    setCommentWindowVisible(true);
  };
  const handleShare = () => {
    // Handle the share action
    console.log("Share");
  };
  // pasidarysi is situ kad tau eitu kur reikia

  return (
    <div className="ReactionButtons-container">
      <div className="reaction-button-text">
        <button className="ReactionButtons" onClick={handleLike}>
          <i class="fa fa-thumbs-up" aria-hidden="true"></i>
        </button>
        <p className="likes-text">102</p>
      </div>
      <div className="reaction-button-text">
        <button className="ReactionButtons" onClick={handleDislike}>
          <i class="fa fa-thumbs-down" aria-hidden="true"></i>
        </button>
        <p className="likes-text">15</p>
      </div>
      <div className="reaction-button-text">
        <button className="ReactionButtons" onClick={handleComment}>
          <i class="fa fa-comment" aria-hidden="true"></i>
        </button>
        <p className="likes-text">4</p>
      </div>
      <div>
        <button className="ReactionButtons" onClick={handleShare}>
          <i class="fa fa-share-alt" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
};

export default ReactionButtons;
