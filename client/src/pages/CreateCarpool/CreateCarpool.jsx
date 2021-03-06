import React, { useState, useEffect } from "react";

import { makeStyles, TextField } from "@material-ui/core";
import { DatePicker, TimePicker } from "@material-ui/pickers";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import Api from "../../Api/Api";
import Button from "../../components/utils/Button/Button";
import Modal from "../../components/utils/Modal/Modal";
import IconBtn from "../../components/utils/Button/IconBtn";
import "./createCarpool.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
}));

function CreateCarpool({
  visible,
  onCloseCreateCarpool,
  userToken,
  onCreateCarpool,
}) {
  const [errMsg, setErrMsg] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const [selectedDate, handleDateChange] = useState(new Date());
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [tripType, setTripType] = useState("roundtrip");

  const classes = useStyles(); //For material Ui

  useEffect(() => {
    setIsVisible(visible);
    reset();
  }, [visible]);

  const reset = () => {
    setName("");
    setFrom("");
    setTo("");
    setErrMsg(null);
    handleDateChange(new Date());
  };

  const nameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const fromHandler = (event) => {
    setFrom(event.currentTarget.value);
  };

  const toHandler = (event) => {
    setTo(event.currentTarget.value);
  };

  const onCreateClick = async () => {
    try {
      const carpool = {
        name,
        from,
        to,
        trip: tripType,
        date: selectedDate,
      };
      console.log("carpool:", carpool);
      const result = await Api.post("carpools", carpool, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      console.log("result:", result.data);
      setIsVisible(false);
      onCreateCarpool(result.data);
    } catch (error) {
      console.log(error);
      // if (error.response.status === 400) {
      //   setErrMsg(error.response.data.error);
      // } else setErrMsg("Error occurred, please try again.");
    }
  };

  const handleRadioChange = (event) => {
    setTripType(event.target.value);
  };

  const content = (
    <div className="card">
      <div className="cardHeader">
        <IconBtn
          iconClass="fas fa-times closeBtn"
          onBtnClick={onCloseCreateCarpool}
        />
      </div>
      <span>Create New Carpool</span>
      <hr />
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          label="Carpool Name"
          fullWidth={true}
          name="name"
          onChange={nameHandler}
          value={name}
          required={true}
        />
        <TextField
          label="Driving From"
          fullWidth={true}
          name="from"
          onChange={fromHandler}
          value={from}
          required={true}
        />
        <TextField
          label="Driving to"
          fullWidth={true}
          name="to"
          onChange={toHandler}
          value={to}
          required={true}
        />
        <FormControl component="fieldset">
          <RadioGroup
            row
            name="tripType"
            defaultValue="roundtrip"
            onChange={handleRadioChange}
          >
            <FormControlLabel
              value="roundtrip"
              control={<Radio color="primary" />}
              label="Round trip"
            />
            <FormControlLabel
              value="oneway"
              control={<Radio color="primary" />}
              label="One-way"
            />
          </RadioGroup>
        </FormControl>

        <DatePicker
          value={selectedDate}
          onChange={handleDateChange}
          minDate={new Date()}
          required={true}
        />
        <TimePicker
          value={selectedDate}
          onChange={handleDateChange}
          required={true}
        />
      </form>

      <div className="actionDiv">
        {errMsg ? <p className="errMsg">{errMsg}</p> : null}
        <Button
          type="submit"
          text="Create"
          variant="solid"
          onClick={onCreateClick}
        />
      </div>
      <hr />
      <Button text="Cancle" variant="outline" onClick={onCloseCreateCarpool} />
    </div>
  );

  return <Modal content={content} visible={isVisible} />;
}
export default CreateCarpool;
