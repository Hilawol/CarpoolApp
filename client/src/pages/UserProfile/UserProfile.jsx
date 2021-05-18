import React, { useState, useEffect } from "react";
import UserDetails from "./UserDetails/UserDetails";
import UserPassengers from "./UserPassengers/UserPassengers";
import "./userProfile.css";

function UserProfile({ userData, userToken }) {
  const [user, setUser] = useState("");
  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    setUser(userData);
    setPassengers(userData.passengers);
  }, [userData]);

  return (
    <div className="userProfile">
      <UserDetails userData={userData} />
      <UserPassengers passengers={passengers} userToken={userToken} />
    </div>
  );
}

export default UserProfile;
