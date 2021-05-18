import React, { useState, useEffect } from "react";
import "./passengersList.css";

function PassengersList({ onAddPassenger }) {
  const [expanded, setExpanded] = useState(false);
  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    const passengers = ["Eden K.", "Liam K.", "Golan K."];
    setPassengers(passengers);
  }, []);

  // const onAddPassengerClick = (event) => {
  //   console.log("click");
  // };

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
        {passengers}
      </div>
    </div>
  );
}

export default PassengersList;
