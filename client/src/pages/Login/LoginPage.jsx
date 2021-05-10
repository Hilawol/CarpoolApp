import React, { useState } from 'react';
import validator from 'validator';
import { Link, useHistory } from 'react-router-dom';
import Button from '../../components/utils/Button/Button';
import Input from '../../components/utils/InputText/Input';
import './loginPage.css';
import Api from '../../Api/Api'

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
    console.log("will login:", user)
    try {
      const { data } = await Api.post('users/login', user);
      console.log(data)
      let token;
      token = data?.token;
      console.log("token:", token);
      if (!token) {
        throw new Error();
      }
      sessionStorage.setItem('token', JSON.stringify(token));
      // console.log(data);
      history.push(`/myProfile`);
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        setErrMsg(error.response.data.error);
      }
      else setErrMsg("Error occurred, please try again.")
    }
  }

  const onSignUpClick = async () => {
    console.log("sogn up");
  }
  return (
    <div className="loginPage">
      <div className="card">
        <div className="cardHeader">
          <Link to='/' > <i className="fas fa-times closeBtn"></i></Link>
        </div>
        <span>Login</span>
        <hr />
        <Input type="email" placeholder="Email" onChange={emailHandler} value={email} />
        <Input type="password" placeholder="Password" onChange={passwordHandler} />
        <div className="actionDiv">
          {errMsg ? <p className="errMsg">{errMsg}</p> : null}
          <Button type="submit" text="Login" variant="solid" onClick={onLoginClick} />
        </div>
        <hr />
        <div className="cardFooter">
          <span>Don't have an account yet?</span>
          <Button text="SIGN UP" variant="text" onClick={onSignUpClick} />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
