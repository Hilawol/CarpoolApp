import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../utils/Button/Button'
import Input from '../../utils/InputText/Input'
import './signUpPage.css'

function SignUpPage() {

  const handleSignUp = () => {
    console.log("signup");
  }

  const handleLogin = () => {
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
        <Input placeholder="Enter Email" />
        <Input placeholder="Enter Password" />
        <div className="actionDiv">
          <Button text="SIGN UP" variant="solid" onClick={handleSignUp} />
        </div>
        <hr />
        <div className="cardFooter">
          <span>Already have an account?</span>
          <Button text="LOGIN" variant="text" onClick={handleLogin} />
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
