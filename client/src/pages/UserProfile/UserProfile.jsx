import React, { useState, useEffect } from "react";
import UserDetails from "./UserDetails/UserDetails";
import UserPassengers from "./UserPassengers/UserPassengers";
import "./userProfile.css";

function UserProfile({ userData, userToken, updateUser, firstTime }) {
  const [passengers, setPassengers] = useState([]);
  useEffect(() => {
    setPassengers(userData.passengers);
    console.log(userData.passengers);
  }, [userData]);

  return (
    <div className="userProfile">
      <div id="userProfileTop">
        <UserDetails userData={userData} />
        <div id="welcomeMsg">
          <div id="passengersImg"></div>
          {firstTime ? (
            <div id="welcomeText">
              <span>
                Welcome <strong>{userData.firstName}</strong>!
              </span>
              <br />
              <p>
                <br />
                Before you get started using CarpoolCommunity,
                <br /> please add some passengers you wish to join to carpool.
                <br /> These passengers will be available for futre use.
              </p>
            </div>
          ) : null}
        </div>
      </div>

      <UserPassengers
        passengersArray={passengers}
        userToken={userToken}
        updateUser={updateUser}
      />
    </div>
  );
}

export default UserProfile;
