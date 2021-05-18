import React, { useState, useEffect } from "react";
import Modal from "../../../components/utils/Modal/Modal";
import Button from "../../../components/utils/Button/Button";
import "./addPassengers.css";

function AddPassengers({
  visible,
  onCloseClick,
  onAddClick,
  passengersArray,
  drivesArray,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [passengers, setPassengers] = useState([]);
  const [drives, setDrives] = useState([]);
  const [radioValue, setRadioValue] = useState("roundtrip");

  useEffect(() => {
    console.log("passengers:", passengersArray);
    setIsVisible(visible);
    setPassengers(
      passengersArray.map((p) => {
        return { passenger: p, checked: false };
      })
    );
    setDrives(
      drivesArray.map((d) => {
        return { drive: d, checked: false };
      })
    );
  }, [visible, passengersArray, drivesArray]);

  const handlePassCheck = (event) => {
    setErrMsg(null);
    console.log(passengers);
    setPassengers(
      passengers.map((p) => {
        if (p.passenger._id === event.currentTarget.id) {
          p.checked = !p.checked;
        }
        return p;
      })
    );
  };

  const handleDriveCheck = (event) => {
    setErrMsg(null);
    setDrives(
      drives.map((d) => {
        if (d.drive._id === event.currentTarget.id) {
          d.checked = !d.checked;
        }
        return d;
      })
    );
  };

  const handleAdd = () => {
    console.log(drives);
    const pass = passengers.filter((p) => p.checked);
    if (!pass.length > 0) {
      return setErrMsg("Please choose at least one passenger");
    }
    const drv = drives.filter((d) => d.checked);
    if (!drv.length > 0) {
      return setErrMsg("Please choose at least one drive");
    }
    const toAdd = [];
    pass.forEach((p) => {
      const drives = [];
      drv.forEach((d) => {
        drives.push(d.drive._id);
      });
      toAdd.push({ passenger: p.passenger._id, drives: drives });
    });
    // console.log(toAdd);
    // const arr = passengers
    //   .filter((p) => p.checked)
    //   .map((p) => {
    //     return { passenger: p.passenger._id, trip: radioValue };
    //   });

    onAddClick(toAdd);
  };

  const content = (
    <div className="addPassenger card">
      <div className="cardHeader">
        <i className="fas fa-times closeBtn" onClick={onCloseClick}></i>
      </div>
      <span>Add Passenger</span>
      <hr />
      <p className="addPassengersTitle">Choose passengers:</p>
      {passengers.map((p, index) => {
        return (
          <div>
            <input
              type="checkbox"
              id={p.passenger._id}
              name={`passenger${index}`}
              value={p.passenger._id}
              className="passBox"
              onChange={handlePassCheck}
            />
            <label for={`passenger${index}`}> {p.passenger.name}</label>
          </div>
        );
      })}
      <p className="addPassengersTitle">Add to:</p>

      {drives.map((d, index) => {
        return (
          <div>
            <input
              type="checkbox"
              id={d.drive._id}
              name={`drive${index}`}
              value={d.drive._id}
              className="driveBox"
              onChange={handleDriveCheck}
            />
            <label htmlFor={`drive${index}`}>
              {d.drive.type === "outbound"
                ? `Drive leaving to: ${d.drive.to}`
                : `Drive returning to: ${d.drive.to}`}
            </label>
          </div>
        );
      })}

      {/* <div>
        <input
          type="radio"
          id="roundtrip"
          name="drive"
          value="roundtrip"
          className="passRadio"
          onChange={handleRadio}
          defaultChecked={true}
        />
        <label for="round">Round trip</label>
      </div>
      <div>
        <input
          type="radio"
          id="outbound"
          name="drive"
          value="outbound"
          className="passRadio"
          onChange={handleRadio}
        />
        <label for="current">Leaving</label>
      </div>
      <div>
        <input
          type="radio"
          id="inbound"
          name="drive"
          value="inbound"
          className="passRadio"
          onChange={handleRadio}
        />
        <label for="current">Returning</label>
      </div> */}
      <br />
      {errMsg ? <p className="errMsg">{errMsg}</p> : null}
      <hr />
      <div className="actionDiv">
        <Button text="Cancel" variant="text" onClick={onCloseClick} />
        <Button type="submit" text="Add" variant="solid" onClick={handleAdd} />
      </div>
    </div>
  );
  return <Modal content={content} visible={isVisible} />;
}

export default AddPassengers;
