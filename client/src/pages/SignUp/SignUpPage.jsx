import React, { useState } from 'react'
import validator from 'validator';
import { Link, useHistory } from 'react-router-dom'
import Button from '../../components/utils/Button/Button'
import Input from '../../components/utils/InputText/Input'
import './signUpPage.css'
import Api from '../../Api/Api'

function SignUpPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errMsg, setErrMsg] = useState(null);

  const history = useHistory();

  const passwordHandler = (event) => {
    setErrMsg(null);
    setPassword(event.currentTarget.value);
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
      const { data } = await Api.post('users/signup', user);
      let token;
      token = data?.token;
      console.log("token:", token);
      sessionStorage.setItem('token', JSON.stringify(token));
      history.push(`/myProfile`);
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
          <Link to='/' > <i className="fas fa-times closeBtn"></i></Link>
        </div>
        <span>Sign Up</span>
        <hr />
        <Input type="text" id="firstName" placeholder="First Name" onChange={nameHandler} value={firstName} />
        <Input type="text" id="lastName" placeholder="Last Name" onChange={nameHandler} value={lastName} />
        <Input type="email" placeholder="Email" onChange={emailHandler} value={email} />
        <Input type="password" placeholder="Password" onChange={passwordHandler} />
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
