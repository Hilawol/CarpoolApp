import React, { useState, useEffect } from "react";
import validator from "validator";
import Api from "../../../Api/Api";
import "./userPassengers.css";

function UserPassengers({ passengersArray, userToken, updateUser }) {
  const [addMode, setAddMode] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    console.log(passengersArray);
    setPassengers(passengersArray);
  }, [passengersArray]);

  const onAddClick = () => {
    setAddMode(true);
  };

  const onCancelAdd = () => {
    setAddMode(false);
    setErrMsg(null);
    //TODO:reset inputs
  };

  const onSavePassengers = async () => {
    if (!validator.isAlpha(firstName.trim())) {
      return setErrMsg("Invalid first name");
    }
    if (!validator.isAlpha(lastName.trim())) {
      return setErrMsg("Invalid last name");
    }
    if (
      mobilePhone !== "" &&
      !validator.isMobilePhone(mobilePhone.trim(), "he-IL")
    ) {
      return setErrMsg("Invalid mobile phone");
    }

    const passenger = {
      name: `${firstName} ${lastName}`,
    };
    if (mobilePhone != "") {
      passenger.phone = mobilePhone;
    }

    try {
      const result = await Api.post("passengers", passenger, {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      console.log(result.data);
      updateUser();
      // setAddMode(false);
    } catch (error) {
      error.response.status == 409
        ? setErrMsg("Passenger alrady exists. Please provide a different name")
        : setErrMsg("Error occured. Please try again");
      console.log("save:");
    }

    //TODO:reset inputs
  };

  const firstNameHandler = (event) => {
    setErrMsg(null);
    setFirstName(event.currentTarget.value);
    //TODO:validate data
  };

  const lastNameHandler = (event) => {
    setErrMsg(null);
    setLastName(event.currentTarget.value);
    //TODO:validate data
  };

  const phoneHandler = (event) => {
    setErrMsg(null);
    setMobilePhone(event.currentTarget.value);
    //TODO:validate data
  };

  const addBlock = (
    <div className="addBlock">
      <label htmlFor="fname">First Name:</label>
      <input type="text" onChange={firstNameHandler} />
      <label htmlFor="">Last Name:</label>
      <input type="text" onChange={lastNameHandler} />
      <label htmlFor="">Mobile Phone:</label>
      <input type="text" placeholder="Optional" onChange={phoneHandler} />
      <button className="btn" onClick={onSavePassengers}>
        Save
      </button>
      <button className="btn" onClick={onCancelAdd}>
        Done
      </button>
      {errMsg ? <div className="errMsg">{errMsg}</div> : null}
    </div>
  );

  return (
    <div>
      <div className="myPassengers">
        <fieldset>
          <legend>
            <h2 className="profileTitle">Passengers</h2>
          </legend>
          <div className="action">
            {!addMode ? (
              <button className="addPassBtn">
                <i className="fas fa-user-plus" onClick={onAddClick}></i>
              </button>
            ) : (
              addBlock
            )}
          </div>
          <div className="passengersList">
            <ul>
              {passengers?.map((p, i) => (
                <li key="i">{`${p.name}  ${p.phone ? p.phone : ""}`}</li>
              ))}
            </ul>
          </div>
        </fieldset>
      </div>
    </div>
  );
}

export default UserPassengers;
