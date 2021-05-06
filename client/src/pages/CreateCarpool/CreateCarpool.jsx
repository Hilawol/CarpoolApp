import React, { useState, useEffect } from 'react';
import validator from 'validator';

import { makeStyles, TextField } from '@material-ui/core';
import { DatePicker, TimePicker } from '@material-ui/pickers';

import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import Button from '../../components/utils/Button/Button';
import Input from '../../components/utils/InputText/Input';
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

function CreateCarpool({ visible, onCancleCreateCarpool }) {

  const [errMsg, setErrMsg] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  const [selectedDate, handleDateChange] = useState(new Date());
  const [name, setName] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

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
    // const value = event.currentTarget.value;
    // if (value !== '') {
    //   if (value.length > password.length) {
    //     setPassword(password.concat(value.slice(-1)))//adds the last added charachter if added one
    //   }
    //   else {//deleted a charachter
    //     setPassword(password.slice(0, password.length - 1));//deleted the last charachter
    //   }
    // }
    // else {
    //   setPassword('');
    // }
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
        date: selectedDate._d
      }
      console.log(carpool);
      // const result = await axios.post('https:/carpool-il.herokuapp.com/api/users/login', user);
      // console.log(data);
      // history.push(`/user/${result.data.user._id}`);
    } catch (error) {
      if (error.response.status === 400) {
        setErrMsg(error.response.data.error);
      }
      else setErrMsg("Error occurred, please try again.")
    }
  }

  const content = <div className="card">
    <div className="cardHeader">
      <IconBtn iconClass="fas fa-times closeBtn" onBtnClick={onCancleCreateCarpool} />
    </div>
    <span>Create New Carpool</span>
    <hr />

    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="standard-basic" label="Carpool Name" fullWidth={true} name="name" onChange={nameHandler} value={name} required={true} />
      <TextField id="filled-basic" label="Driving From" fullWidth={true} name="from" onChange={fromHandler} value={from} required={true} />
      <TextField id="outlined-basic" label="Driving to" fullWidth={true} name="to" onChange={toHandler} value={to} required={true} />
      <DatePicker value={selectedDate} onChange={handleDateChange} minDate={new Date()} required={true} />
      <TimePicker value={selectedDate} onChange={handleDateChange} required={true} />
    </form>

    <div className="actionDiv">
      {errMsg ? <p className="errMsg">{errMsg}</p> : null}
      <Button type="submit" text="Create" variant="solid" onClick={onCreateClick} />
    </div>
    <hr />
    <Button text="Cancle" variant="outline" onClick={onCancleCreateCarpool} />
  </div>

  return (
    <Modal content={content} visible={isVisible} />
  )
}
export default CreateCarpool
