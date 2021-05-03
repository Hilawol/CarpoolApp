import React from 'react'
import './App.css';
import { Route } from 'react-router';
import LandingPage from './components/pages/LandingPage/LandingPage'
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/utils/Navbar/Navbar';
import SignUpPage from './components/pages/SignUpPage/SignUpPage'
function App() {

  return (
    <div>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Route exact path='/' component={LandingPage, Navbar} />
        <Route exact path='/signup' component={SignUpPage} />
        {/* <Route exact path='/create-carpool' component={CreateCarpool} /> */}
      </BrowserRouter>

    </div>
  );
}

export default App;
