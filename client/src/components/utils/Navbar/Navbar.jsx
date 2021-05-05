import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './navbar.css'
// import Logo from '../../img/Translate.png';

function Navbar() {

  const [selected, setSelected] = useState("home");
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    switch (currentPath) {
      case '/':
        setSelected("home");
        break;
      case '/signup':
        setSelected("signup");
        break;
      // case '/favorites':
      //   setSelected("favorites");
      //   break;
      default:
    }
  }, [location]);

  return (
    <div className="navbar">
      {/* <Link className={selected === "home" ? "selected" : ''} to="/"><img className="logo" src={Logo} alt="yad2logo" /></Link> */}
      <div className="navBtns">
        <div className="navBtn" ><Link className={selected === "home" ? "selected" : ''} to="/">Home</Link></div>
        {/* <div className="navBtn" ><Link className={selected === "translation" ? "selected" : ''} to="/translation">Translate</Link></div>
        <div className="navBtn" ><Link className={selected === "favorites" ? "selected" : ''} to="/favorites">Favorites</Link></div> */}
        <div className="navBtn" ><Link className={selected === "login" ? "selected" : ''} to="/login">Login</Link></div>
        <div className="navBtn" ><Link className={selected === "signup" ? "selected" : ''} to="/signup">Get Started</Link></div>
      </div>
    </div>
  )
}

export default Navbar
