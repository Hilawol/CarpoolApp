import React from "react";
import "./car.css";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

function Car({ car }) {
  return (
    <div className="car">
      {car.driver.firstName}
      {car.capacity}
      <PersonAddIcon onClick={() => console.log("Add passenger")} />
    </div>
  );
}

export default Car;
