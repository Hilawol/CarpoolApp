import React from 'react'
import './App.css';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../src/components/utils/Navbar/Navbar'
import LandingPage from '../src/components/pages/Landing/LandingPage'
import SignUpPage from '../src/components/pages/SignUp/SignUpPage'
import LoginPage from '../src/components/pages/Login/LoginPage'

function App() {

  return (
    <div>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Route exact path='/' component={LandingPage, Navbar} />
        <Route exact path='/signup' component={SignUpPage} />
        <Route exact path='/login' component={LoginPage} />
        {/* <Route exact path='/create-carpool' component={CreateCarpool} /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
