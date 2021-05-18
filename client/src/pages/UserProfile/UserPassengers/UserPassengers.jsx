import React, { useState } from "react";
import validator from "validator";
import Api from "../../../Api/Api";

function UserPassengers({ passengers, userToken }) {
  const [addMode, setAddMode] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");

  const onAddClick = () => {
    setAddMode(true);
  };

  const onCancelAdd = () => {
    setAddMode(false);
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
    } catch (error) {}
    console.log("save:", passenger);
    setAddMode(false);
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
        Cancel
      </button>
      {errMsg ? <div>{errMsg}</div> : null}
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
            ) : null}
          </div>
          {addMode ? addBlock : null}
        </fieldset>
      </div>
    </div>
  );
}

export default UserPassengers;
