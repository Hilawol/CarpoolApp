import React, { useState } from 'react'
import validator from 'validator';
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import Button from '../../utils/Button/Button'
import Input from '../../utils/InputText/Input'
import './signUpPage.css'
function SignUpPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errMsg, setErrMsg] = useState(null);

  const history = useHistory();

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

  const nameHandler = (event) => {
    setErrMsg(null);
    const name = event.currentTarget.value;
    event.currentTarget.id === "firstName" ?
      setfirstName(name) : setLastName(name);
  }

  const emailHandler = (event) => {
    setErrMsg(null);
    setEmail(event.currentTarget.value);
  }

  const onSignUpClick = async (event) => {

    if (!validator.isAlpha(firstName.trim())) {
      return setErrMsg("Invalid first name");
    }
    if (!validator.isAlpha(lastName.trim())) {
      return setErrMsg("Invalid last name");
    }
    if (!validator.isEmail(email)) {
      return setErrMsg("Invalid email");
    }
    if (!validator.isStrongPassword(password)) {
      return setErrMsg(`Invalid Password.
       Min length:8. Must include min: 1 lowercase,1 uppercase, 1 minNumbers,1 minSymbols.`);
    }
    const user = {
      firstName,
      lastName,
      email,
      password
    }
    try {
      const data = await axios.post('http://localhost:5000/api/users', user);
      history.push('/');
    } catch (error) {
      if (error.response.status === 406) {
        setErrMsg(error.response.data.error);
      }
      else setErrMsg("Error occurred, please try again.")
    }
  }

  const onLoginClick = () => {
    history.push('/login');
  }

  return (
    <div className="signUpPage">
      <div className="card">
        <div className="cardHeader">
          <Link to='/' > <i className="fas fa-times"></i></Link>
        </div>
        <span>Sign Up</span>
        <hr />
        <Input id="firstName" placeholder="First Name" onChange={nameHandler} value={firstName} />
        <Input id="lastName" placeholder="Last Name" onChange={nameHandler} value={lastName} />
        <Input placeholder="Email" onChange={emailHandler} value={email} />
        <Input placeholder="Password" onChange={passwordHandler} value={password ? '*'.repeat(password.length) : ''} />
        <div className="actionDiv">
          {errMsg ? <p className="errMsg">{errMsg}</p> : null}
          <Button type="submit" text="SIGN UP" variant="solid" onClick={onSignUpClick} />
        </div>
        <hr />
        <div className="cardFooter">
          <span>Already have an account?</span>
          <Button text="LOGIN" variant="text" onClick={onLoginClick} />
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
