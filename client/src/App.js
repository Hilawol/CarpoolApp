import React from 'react'
import './App.css';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../src/components/utils/Navbar/Navbar'
import LandingPage from '../src/components/pages/Landing/LandingPage'
import SignUpPage from '../src/components/pages/SignUp/SignUpPage'
import LoginPage from '../src/components/pages/Login/LoginPage'
import UserPage from './components/pages/UserPage/UserPage';

function App() {

  return (
    <div>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Route path='/' exact component={LandingPage, Navbar} />
        <Route path='/user/:id' exact component={UserPage} />
        <Route path='/signup' exact component={SignUpPage} />
        <Route path='/login' exact component={LoginPage} />
        {/* <Route exact path='/create-carpool' component={CreateCarpool} /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
