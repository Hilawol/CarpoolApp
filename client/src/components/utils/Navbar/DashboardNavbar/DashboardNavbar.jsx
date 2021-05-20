import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./dashboardNavbar.css";

function DashboardNavbar() {
  const [selected, setSelected] = useState("home");
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    switch (currentPath) {
      case "/":
        setSelected("home");
        break;
      case "/signup":
        setSelected("signup");
        break;
      case "/login":
        setSelected("login");
        break;
      default:
    }
  }, [location]);

  return (
    <div className="dashboardNavbar">
      {/* <Link className={selected === "home" ? "selected" : ''} to="/"><img className="logo" src={Logo} alt="yad2logo" /></Link> */}
      <div className="navBtns">
        <div className="navBtn dash">
          <Link className={selected === "home" ? "selected" : ""} to="/">
            <i className="fas fa-car"></i>
          </Link>
        </div>
        <div className="navBtn">
          <Link className={selected === "login" ? "selected" : ""} to="/login">
            Profile
          </Link>
        </div>
        <div className="navBtn">
          <Link
            className={selected === "signup" ? "selected" : ""}
            to="/signup"
          >
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardNavbar;
