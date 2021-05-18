import React, { useState, useEffect } from "react";
import UserDetails from "./UserDetails/UserDetails";
import UserPassengers from "./UserPassengers/UserPassengers";
import "./userProfile.css";

function UserProfile({ userData, userToken, updateUser }) {
  const [passengers, setPassengers] = useState([]);
  useEffect(() => {
    setPassengers(userData.passengers);
    console.log(userData.passengers);
  }, [userData]);

  return (
    <div className="userProfile">
      <UserDetails userData={userData} />
      <UserPassengers
        passengersArray={passengers}
        userToken={userToken}
        updateUser={updateUser}
      />
    </div>
  );
}

export default UserProfile;
