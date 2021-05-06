import React, { useState } from 'react';
import validator from 'validator';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Button from '../../components/utils/Button/Button';
import Input from '../../components/utils/InputText/Input';
import './loginPage.css';

function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState(null);

  const history = useHistory();

  const emailHandler = (event) => {
    setErrMsg(null);
    setEmail(event.currentTarget.value);
  }

  const passwordHandler = (event) => {
    setErrMsg(null);
    const value = event.currentTarget.value;
    if (value !== '') {
      if (value.length > password.length) {
        setPassword(password.concat(value.slice(-1)))//adds the last added charachter if added one
      }
      else {//deleted a charachter
        setPassword(password.slice(0, password.length - 1));//deleted the last charachter
      }
    }
    else {
      setPassword('');
    }
  }

  const onLoginClick = async () => {
    if (!validator.isEmail(email)) {
      return setErrMsg("Invalid email");
    }
    if (!validator.isStrongPassword(password)) {
      return setErrMsg(`Invalid Password.
       Min length:8. Must include min: 1 lowercase,1 uppercase, 1 minNumbers,1 minSymbols.`);
    }
    const user = {
      email,
      password
    }
    try {
      const result = await axios.post('https:/carpool-il.herokuapp.com/api/users/login', user);
      // console.log(data);
      history.push(`/user/${result.data.user._id}`);
    } catch (error) {
      if (error.response.status === 400) {
        setErrMsg(error.response.data.error);
      }
      else setErrMsg("Error occurred, please try again.")
    }
  }


  return (
    <div className="loginPage">
      <div className="card">
        <div className="cardHeader">
          <Link to='/' > <i className="fas fa-times closeBtn"></i></Link>
        </div>
        <span>Login</span>
        <hr />
        <Input placeholder="Email" onChange={emailHandler} value={email} />
        <Input placeholder="Password" onChange={passwordHandler} value={password ? '*'.repeat(password.length) : ''} />
        <div className="actionDiv">
          {errMsg ? <p className="errMsg">{errMsg}</p> : null}
          <Button type="submit" text="Login" variant="solid" onClick={onLoginClick} />
        </div>
        <hr />
      </div>
    </div>
  )
}

export default LoginPage