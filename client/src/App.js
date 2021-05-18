import React from 'react'
import './App.css';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import Navbar from '../src/components/utils/Navbar/Navbar';
import LandingPage from '../src/pages/Landing/LandingPage';
import SignUpPage from '../src/pages/SignUp/SignUpPage';
import LoginPage from '../src/pages/Login/LoginPage';
import UserDashboard from '../src/pages/UserDashboard/UserDashboard';

import MomentUtils from '@date-io/moment';
import DashboardNavbar from './components/utils/Navbar/DashboardNavbar/DashboardNavbar';

function App() {

  return (
    <MuiPickersUtilsProvider utils={MomentUtils} locale="il" format="dd/MM/yyyy">
      <div>
        <BrowserRouter>
        <Switch>
        <Route path='/myProfile'  component={UserDashboard}/>
        <Route path='/myProfile'  component={DashboardNavbar}/>
          <div>
          <Navbar />
          <Route path='/' exact component={LandingPage}/>
          <Route path='/signup' exact component={SignUpPage} />
          <Route path='/login' exact component={LoginPage} />
         </div>
          </Switch>
        </BrowserRouter>
      </div>
    </MuiPickersUtilsProvider >
  );
}

export default App;
