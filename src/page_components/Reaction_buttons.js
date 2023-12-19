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
      <button className="ReactionButtons" onClick={handleLike}>
        <i class="fa fa-thumbs-up" aria-hidden="true"></i>
      </button>
      <button className="ReactionButtons" onClick={handleDislike}>
        <i class="fa fa-thumbs-down" aria-hidden="true"></i>
      </button>
      <button className="ReactionButtons" onClick={handleComment}>
        <i class="fa fa-comment" aria-hidden="true"></i>
      </button>
      <button className="ReactionButtons" onClick={handleShare}>
        <i class="fa fa-share-alt" aria-hidden="true"></i>
      </button>
    </div>
  );
};

export default ReactionButtons;
