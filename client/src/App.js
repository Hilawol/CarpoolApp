import React from 'react'
import './App.css';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
// import { DatePicker, TimePicker } from '@material-ui/pickers';

import Navbar from '../src/components/utils/Navbar/Navbar'
import LandingPage from '../src/pages/Landing/LandingPage'
import SignUpPage from '../src/pages/SignUp/SignUpPage'
import LoginPage from '../src/pages/Login/LoginPage'

import MomentUtils from '@date-io/moment';
// import Carpool from './pages/UserPage/Carpools/Carpool/Carpool';
// import Sidebar from './pages/UserPage/SideBar/Sidebar';
import UserDashboard from './pages/UserDashboard/UserDashboard'


function App() {

  return (
    <MuiPickersUtilsProvider utils={MomentUtils} locale="il" format="dd/MM/yyyy">
      <div>
        <BrowserRouter>
          <Route path='/' exact component={LandingPage, Navbar} />
          <Route path='/myProfile' exact component={UserDashboard} />
          <Route path='/signup' exact component={SignUpPage} />
          <Route path='/login' exact component={LoginPage} />
          {/* <Route path='/carpool/:id' exact component={Carpool} />
          <Route path='/carpool/:id' exact component={Sidebar} /> */}
        </BrowserRouter>
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default App;
