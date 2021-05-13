import React from "react";
import "./car.css";

function Car({ car }) {
  return (
    <div>
      {car.driver}
      {car.capacity}
    </div>
  );
}

export default Car;
