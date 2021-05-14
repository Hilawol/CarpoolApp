import React, { useState, useEffect } from "react";
import "./drive.css";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import AddCar from "../../AddCar/AddCar";
import Api from "../../../Api/Api";
import Car from "../Car/Car";

function Drive({ id, type, from, to, date, user, userToken }) {
  const [openAddCar, setOpenAddCar] = useState(false);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState(null);

  useEffect(() => {
    const getCars = async () => {
      try {
        setLoading(true);
        const result = await Api.get(`/drives/${id}/cars`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setCars(result.data);
        setLoading(false);
      } catch (error) {
        setErrMsg("An error ocurred. Please try again.");
        setLoading(false);
      }
    };
    getCars();
  }, []);

  const onAddCarClick = () => {
    setOpenAddCar(true);
  };

  const onCloseAddCar = () => {
    setOpenAddCar(false);
  };

  const onCreateCar = async (cars) => {
    console.log("create car:", cars);
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
            <AddCircleOutlineOutlinedIcon
              fontSize="large"
              sx={{ mr: 1 }}
              className="addIcon"
            />
            <span className="addCarText">Add Car</span>
          </button>
        </div>
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
        ) : !cars.length > 0 ? (
          <div>No Cars</div>
        ) : (
          cars.map((car, index) => <Car car={car} key={index} />)
        )}
      </div>
    </div>
  );
}

export default Drive;
