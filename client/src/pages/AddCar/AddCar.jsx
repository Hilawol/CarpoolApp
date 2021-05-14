import React, { useState, useEffect } from "react";
import Modal from "../../components/utils/Modal/Modal";
import Input from "../../components/utils/InputText/Input";
import Button from "../../components/utils/Button/Button";
import Api from "../../Api/Api";

import "./addcar.css";

function AddCar({ driveId, driver, userToken, visible, onClose, onAdd }) {
  const [capacity, setCapacity] = useState();
  const [driverName, setDriverName] = useState();
  const [errMsg, setErrMsg] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(visible);
    setDriverName(`${driver?.firstName} ${driver?.lastName}`);
  }, [visible, driverName]);

  const onCloseClick = () => {
    onClose();
    setErrMsg("");
    setCapacity(null);
  };

  const onAddClick = async () => {
    if (!isNaN(capacity) && !isNaN(parseInt(capacity))) {
      if (capacity > 0 && capacity <= 7) {
        try {
          const result = await Api.post(
            `/drives/${driveId}/cars`,
            { driver: driver._id, capacity },
            {
              headers: { Authorization: `Bearer ${userToken}` },
            }
          );
          console.log(result.data);
          return onAdd(result.data);
        } catch (error) {
          setErrMsg("An error ocuured. Please tru again.");
        }
      }
      return setErrMsg("Invalid value. Capacity must be between 1-7");
    }
  };

  const capacityHandler = (event) => {
    setCapacity(event.currentTarget.value);
  };

  const content = (
    <div className="addCardModal card">
      <div className="cardHeader">
        <i className="fas fa-times closeBtn" onClick={onCloseClick}></i>
      </div>
      <span>Add Car</span>
      <hr />
      <p className="driverName">Driver: {driverName}</p>
      <Input
        type="Number"
        min="1"
        max="10"
        placeholder="Passengers Capacity"
        onChange={(event) => capacityHandler(event)}
        value={capacity}
      />
      {errMsg ? <p className="errMsg">{errMsg}</p> : null}
      <div className="actionDiv">
        <Button
          type="submit"
          text="Cancle"
          variant="text"
          onClick={onCloseClick}
        />
        <Button
          type="submit"
          text="Add Car"
          variant="solid"
          onClick={onAddClick}
        />
      </div>
    </div>
  );

  return <Modal content={content} visible={isVisible} />;
}

export default AddCar;
