import React, { useState, useEffect } from 'react';
// import validator from 'validator';

import { makeStyles, TextField } from '@material-ui/core';
import { DatePicker, TimePicker } from '@material-ui/pickers';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';

// import { Link, useHistory } from 'react-router-dom';

import Api from '../../Api/Api';
import Button from '../../components/utils/Button/Button';
// import Input from '../../components/utils/InputText/Input';
import Modal from '../../components/utils/Modal/Modal';
import IconBtn from '../../components/utils/Button/IconBtn';
import './createCarpool.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));

function CreateCarpool({ visible, onCloseCreateCarpool, userToken, onCreateCarpool }) {

  const [errMsg, setErrMsg] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  const [selectedDate, handleDateChange] = useState(new Date());
  const [name, setName] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [tripRadio, handleRadioChange] = useState('roundTrip');

  const classes = useStyles(); //For material Ui

  useEffect(() => {
    setIsVisible(visible);
    reset();
  }, [visible])

  const reset = () => {
    setName('');
    setFrom('');
    setTo('');
    handleDateChange(new Date());
  }

  const nameHandler = (event) => {
    setName(event.currentTarget.value);
  }

  const fromHandler = (event) => {
    setFrom(event.currentTarget.value);
  }

  const toHandler = (event) => {
    setTo(event.currentTarget.value);
  }

  const onCreateClick = async () => {
    try {

      const carpool = {
        name,
        from,
        to,
        trip: tripRadio,
        date: selectedDate
      }
      console.log(carpool);

      const result = await Api.post('carpools', carpool, { headers: { 'Authorization': `Bearer ${userToken}` } });
      console.log("newCarpool:", result.data);
      setIsVisible(false);
      onCreateCarpool("carpool created:", result.data);
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        setErrMsg(error.response.data.error);
      }
      else setErrMsg("Error occurred, please try again.")
    }
  }

  const content = <div className="card">
    <div className="cardHeader">
      <IconBtn iconClass="fas fa-times closeBtn" onBtnClick={onCloseCreateCarpool} />
    </div>
    <span>Create New Carpool</span>
    <hr />
    <form className={classes.root} noValidate autoComplete="off">
      <TextField label="Carpool Name" fullWidth={true} name="name" onChange={nameHandler} value={name} required={true} />
      <TextField label="Driving From" fullWidth={true} name="from" onChange={fromHandler} value={from} required={true} />
      <TextField label="Driving to" fullWidth={true} name="to" onChange={toHandler} value={to} required={true} />
      <FormControl component="fieldset">
        <RadioGroup row aria-label="position" name="position" defaultValue="roundTrip" value={tripRadio} onChange={handleRadioChange}>

          <FormControlLabel
            value="roundTrip"
            control={<Radio color="primary" />}
            label="Round trip"
          />
          <FormControlLabel
            value="oneWay"
            control={<Radio color="primary" />}
            label="One-way"
          />
        </RadioGroup>
      </FormControl>

      <DatePicker value={selectedDate} onChange={handleDateChange} minDate={new Date()} required={true} />
      <TimePicker value={selectedDate} onChange={handleDateChange} required={true} />
    </form>

    <div className="actionDiv">
      {errMsg ? <p className="errMsg">{errMsg}</p> : null}
      <Button type="submit" text="Create" variant="solid" onClick={onCreateClick} />
    </div>
    <hr />
    <Button text="Cancle" variant="outline" onClick={onCloseCreateCarpool} />
  </div>

  return (
    <Modal content={content} visible={isVisible} />
  )
}
export default CreateCarpool
