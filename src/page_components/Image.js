// Image.js
import React from "react";
import background from "../src/assets/newspaper.jpg";

function Image() {
  return (
    <div style={{ backgroundImage: `url(${background})` }}>
      {background}
    </div>
  );
}

export default Image;
