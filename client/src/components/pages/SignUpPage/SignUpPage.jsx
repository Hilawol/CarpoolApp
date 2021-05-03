import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../utils/Button/Button'
import Input from '../../utils/InputText/Input'
import './signUpPage.css'

function SignUpPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const passwordHandler = (event) => {
    console.log(event.currentTarget.value);
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

  const emailHandler = (event) => {
    console.log(event.currentTarget.value);
    setEmail(event.currentTarget.value);
  }

  const onSignUpClick = () => {
    console.log(`email:${email}, password:${password}`);
  }

  const onLoginClick = () => {
    console.log("login");
  }

  return (
    <div className="signUpPage">
      <div className="card">
        <div className="cardHeader">
          <Link to='/' > <i className="fas fa-times"></i></Link>
        </div>
        <span>Sign Up</span>
        <hr />
        <Input placeholder="Enter Email" onChange={emailHandler} value={email} />
        <Input placeholder="Enter Password" onChange={passwordHandler} value={password ? '*'.repeat(password.length) : ''} />
        <div className="actionDiv">
          <Button text="SIGN UP" variant="solid" onClick={onSignUpClick} />
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
