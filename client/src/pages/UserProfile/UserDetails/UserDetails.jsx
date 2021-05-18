import React from "react";

function UserDetails({ userData }) {
  return (
    <div className="userDetails">
      <fieldset>
        <legend>
          <h2 className="profileTitle">User Profile</h2>
        </legend>
        <label htmlFor="">First Name:</label>
        <input type="text" value={userData.firstName} readOnly />
        <br />
        <label htmlFor="">Last Name:</label>
        <input type="text" value={userData.firstName} readOnly />
        <br />
        <label htmlFor="">Email:</label>
        <input type="text" value={userData.email} readOnly />
        <br />
        <label htmlFor="">Password:</label>
        <input type="password" value="********" readOnly />
      </fieldset>
    </div>
  );
}

export default UserDetails;
