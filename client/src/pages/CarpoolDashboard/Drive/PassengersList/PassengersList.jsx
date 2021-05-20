import React, { useState, useEffect } from "react";
import "./passengersList.css";

function PassengersList({ passengers, cars }) {
  const [expanded, setExpanded] = useState(false);
  // const [passengers, setPassengers] = useState([]);

  useEffect(() => {}, [passengers]);

  // const onAddPassengerClick = (event) => {
  //   console.log("click");
  // };

  const assignHandler = (event) => {
    console.log("assign:", event.currentTarget.id);
    // const passenger = passengers.find((p) => p._id === event.currentTarget.id);
    // passenger.edit = true;
    // console.log(passengers);
  };

  return (
    <div className="acordion">
      <div className="accordionSummary">
        {/* <i className="fas fa-user-plus addPassBtn" onClick={onAddPassenger}></i> */}
        <span className="summaryTitle">Passengers</span>
        <i
          className={`fas fa-chevron-${expanded ? "up" : "down"} expandBtn`}
          onClick={() => setExpanded(!expanded)}
        ></i>
      </div>
      <div
        className={`accordionContent${expanded ? " expanded" : " collapsed"}`}
      >
        <div className="passengersList">
          <ul>
            {passengers?.map((p, i) => (
              <li key={i} id={p._id} onClick={assignHandler}>
                {`${p.name}`}
                {/* <span className="assignIcon">
                  <i className="fas fa-sign-in-alt "></i>
                </span> */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PassengersList;
