import React from 'react'
import './drive.css'
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

function Drive({ type, from, to, date }) {

  return (
    <div className="drive">
      <div className="driveHeader">
        <div className="destination">
          <DoubleArrowIcon className={type === "outbound" ? "outColor outArrow" : "inColor"} />
          <DoubleArrowIcon className={type === "outbound" ? "outColor outArrow" : "inColor"} />
          <DoubleArrowIcon className={type === "outbound" ? "outColor outArrow" : "inColor"} />
          <h3 >{`Driving to ${to}`}</h3>
        </div>
        <h3>{date}</h3>
        <div className="action">
          <button className={type === "outbound" ? "outBkg addCar" : "inBkg addCar"}>
            <AddCircleOutlineOutlinedIcon fontSize="large" sx={{ mr: 1 }} className="addIcon" />
            <span className="addCarText">Add Car</span>
          </button>
        </div>
      </div>
      <div className={type === "outbound" ? "outBkg carsSection" : "inBkg carsSection"}>
      </div>
    </div >
  )
}

export default Drive
