import React from "react";

function UserPassengers({ passengers }) {
  return (
    <div>
      <div className="myPassengers">
        <fieldset>
          <legend>
            <h2 className="profileTitle">My Passengers</h2>
          </legend>
          <div className="action"></div>
        </fieldset>
      </div>
    </div>
  );
}

export default UserPassengers;
