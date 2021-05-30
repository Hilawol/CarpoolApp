import React, { useState, useEffect } from "react";
import "./drive.css";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import AddCar from "../../AddCar/AddCar";
import Api from "../../../Api/Api";
import Car from "../Car/Car";
import PassengersList from "./PassengersList/PassengersList";

function Drive({ id, type, to, date, user, userToken }) {
  const [openAddCar, setOpenAddCar] = useState(false);
  const [cars, setCars] = useState(null);
  const [passengers, setPassengers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState(null);

  useEffect(() => {
    setLoading(true);
    const getCars = async () => {
      try {
        const result = await Api.get(`/drives/${id}/cars`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setCars(result.data);
      } catch (error) {
        setErrMsg("An error ocurred. Please try again.");
        setLoading(false);
      }
    };

    const getPassengers = async () => {
      try {
        const result = await Api.get(`/passengers/drive/${id}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setPassengers(result.data);
      } catch (error) {
        setErrMsg("An error ocurred. Please try again.");
        setLoading(false);
      }
    };
    getCars();
    getPassengers();
    setLoading(false);
  }, [user]);

  const onAddCarClick = () => {
    setOpenAddCar(true);
  };

  const onCloseAddCar = () => {
    setOpenAddCar(false);
  };

  const onCreateCar = async (cars) => {
    setCars(cars);
    onCloseAddCar();
  };

  return (
    <div className="drive">
      <div className="driveHeader">
        <div className="destination">
          <DoubleArrowIcon
            className={type === "outbound" ? "outColor" : "inColor inArrow"}
          />
          <DoubleArrowIcon
            className={type === "outbound" ? "outColor" : "inColor inArrow"}
          />
          <DoubleArrowIcon
            className={type === "outbound" ? "outColor" : "inColor inArrow"}
          />
          <h3>{`Driving to ${to}`}</h3>
        </div>
        <h3>{date}</h3>
        <div className="action">
          <button
            onClick={onAddCarClick}
            className={
              type === "outbound" ? "outBkg addCarBtn" : "inBkg addCarBtn"
            }
          >
            <i className="fas fa-car addIcon"></i>
            <span className="addCarText">Add Car</span>
          </button>
        </div>
      </div>
      <div className="passengersSection">
        <PassengersList passengers={passengers} cars={cars} />
      </div>
      <div
        className={
          type === "outbound" ? "outBkg carsSection" : "inBkg carsSection"
        }
      >
        <AddCar
          visible={openAddCar}
          onClose={onCloseAddCar}
          onAdd={onCreateCar}
          driver={user}
          driveId={id}
          userToken={userToken}
        />
        {errMsg ? (
          <div>{errMsg}</div>
        ) : loading ? (
          <div>Loading...</div>
        ) : (
          cars?.map((car, index) => (
            <Car car={car} key={index} index={index + 1} />
          ))
        )}
      </div>
    </div>
  );
}

export default Drive;
