import "../css/reaction_buttons.css"
const ReactionButtons = () => {
    const handleLike = () => {
      // Handle the like action
      console.log('Liked!');
    };
  
    const handleDislike = () => {
      // Handle the dislike action
      console.log('Disliked!');
    };
    const handleComment = () => {
        // Handle the comment action
        console.log('Comment')
    }
    const handleShare = () => {
        // Handle the share action
        console.log('Share')
    }
    // pasidarysi is situ kad tau eitu kur reikia
  
    return (
      <div className="ReactionButtons">
        <button onClick={handleLike}><i class="fa fa-thumbs-up" aria-hidden="true"></i></button>
        <button onClick={handleDislike}><i class="fa fa-thumbs-down" aria-hidden="true"></i></button>
        <button onClick={handleComment}><i class="fa fa-comment" aria-hidden="true"></i></button>
        <button onClick={handleShare}><i class="fa fa-share-alt" aria-hidden="true"></i></button>
      </div>
    );
  };
  
  export default ReactionButtons;