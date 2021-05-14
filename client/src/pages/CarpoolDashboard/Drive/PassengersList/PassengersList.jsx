import React, { useState } from "react";
import "./passengersList.css";

function PassengersList() {
  const [expanded, setExpanded] = useState(false);

  const onAddPassengerClick = (event) => {
    console.log("click");
  };

  return (
    <div className="acordion">
      <div className="accordionSummary">
        <i
          className="fas fa-user-plus addPassBtn"
          onClick={onAddPassengerClick}
        ></i>
        <span className="summaryTitle">Passengers</span>
        <i
          className={`fas fa-chevron-${expanded ? "up" : "down"} expandBtn`}
          onClick={() => setExpanded(!expanded)}
        ></i>
      </div>
      <div
        className={`accordionContent${expanded ? " expanded" : " collapsed"}`}
      >
        content
      </div>
    </div>
  );
}

export default PassengersList;
