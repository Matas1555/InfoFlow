import dafaultProfilePhoto from "../assets/default_profile.png";
import "../css/profile.css";
import { auth } from "../App";
import { useEffect, useState } from "react";

export default function Profile() {
  const currentUser = auth.currentUser;
  const [photoURL, setPhotoURL] = useState(dafaultProfilePhoto);

  useEffect(() => {
    if (currentUser && currentUser.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

  return (
    <div className="avatar-container">
      <img src={photoURL} className="avatar" />
    </div>
  );
}
