import defaultProfilePhoto from "../assets/default_profile.png";
import "../css/profile.css";
import { auth, realtimeDatabase } from "../firebaseConfig";
import { getDatabase, ref, get } from "firebase/database";
import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

export default function Profile() {
  const currentUser = auth.currentUser;
  const [photoURL, setPhotoURL] = useState(defaultProfilePhoto);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (currentUser && currentUser.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }

    const fetchUserData = async () => {
      const userRef = ref(realtimeDatabase, `users/${currentUser.uid}`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        throw new Error(`No user found with ID ${currentUser.uid}`);
      }
    };

    const fetchAndSetUsername = async () => {
      let user = await fetchUserData();
      setUsername(user.username);
    };

    fetchAndSetUsername();
  }, [currentUser]);

  return (
    <div className="avatar-container">
      <img src={photoURL} className="avatar" alt="User Avatar" />
      <p className="avatar-username">{username}</p>
    </div>
  );
}
