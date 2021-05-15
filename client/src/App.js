import React from 'react'
import './App.css';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import Navbar from '../src/components/utils/Navbar/Navbar';
import LandingPage from '../src/pages/Landing/LandingPage';
import SignUpPage from '../src/pages/SignUp/SignUpPage';
import LoginPage from '../src/pages/Login/LoginPage';
import UserDashboard from './pages/UserDashboard/UserDashboard';

import MomentUtils from '@date-io/moment';



function App() {

  return (
    <MuiPickersUtilsProvider utils={MomentUtils} locale="il" format="dd/MM/yyyy">
      <div>
        <BrowserRouter>
        <Navbar />
          <Route path='/' exact >
            <LandingPage />
          </Route>
          <Route path='/myProfile' exact component={UserDashboard} />
          <Route path='/signup' exact component={SignUpPage} />
          <Route path='/login' exact component={LoginPage} />
        </BrowserRouter>
      </div>
    </MuiPickersUtilsProvider >
  );
}

export default App;
