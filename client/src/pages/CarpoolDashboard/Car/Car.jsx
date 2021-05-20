import React, { useState, useEffect } from "react";
import "./car.css";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import AirlineSeatLegroomReducedIcon from "@material-ui/icons/AirlineSeatLegroomReduced";

function Car({ car, index }) {
  const [availables, setAvailables] = useState();

  useEffect(() => {
    setAvailables(car.capacity - car.passengers.length);
  }, [car]);

  return (
    <div className="car">
      <strong className="driver">Driver:</strong>
      <span>{`${car.driver.firstName} ${car.driver.lastName}`}</span>
      {/* <i className="fas fa-user-plus icon" onClick={() => {}}></i> */}
      <br />

      <div className="carAvailability">
        <i className="fas fa-user"></i>
        <span> {car.capacity}</span>
      </div>
      <div className="carFooter">
        <div className="carNumber">
          <i className="fas fa-hashtag"></i>
          <span>{index}</span>
        </div>
        <i className="fas fa-trash-alt icon"></i>
      </div>

      {/* <PersonAddIcon onClick={() => console.log("Add passenger")} /> */}
    </div>
  );
}

export default Car;
