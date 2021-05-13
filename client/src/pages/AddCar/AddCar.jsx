import React, { useState, useEffect } from "react";
import Modal from "../../components/utils/Modal/Modal";
import Input from "../../components/utils/InputText/Input";
import Button from "../../components/utils/Button/Button";
import Api from "../../Api/Api";

import "./addcar.css";

function AddCar({ driverName, visible, onClose, onAdd }) {
  const [capacity, setCapacity] = useState();
  const [driver, setDriver] = useState();
  const [errMsg, setErrMsg] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(visible);
    setDriver(driverName);
  }, [visible, driverName]);

  const onCloseClick = () => {
    onClose();
  };

  const onAddClick = () => {
    if (!isNaN(capacity) && !isNaN(parseInt(capacity))) {
      if (capacity > 0 && capacity <= 10) {
        return onAdd({ driver: driverName, capacity });
      }
    }
    return setErrMsg("Invalid value. Capacity must be between 1-10");
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
        <Button type="submit" text="Cancle" variant="text" onClick={onClose} />
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
