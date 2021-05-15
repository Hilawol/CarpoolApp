import React from "react";
import "./landingPage.css";
import Button from "../../components/utils/Button/Button";

function LandingPage() {
  return (
    <div className="landingPage">
      <div className="welcomeMsg">
        <h1 className="welcomeH1">Make Community Carpool Easy</h1>
        <h2 className="welcomeH2">Join Create Share</h2>
        <Button
          text="Get Started"
          className="welcomeGetStartedBtn"
          welcomeGetStartedBtntext="Get Started"
        />
      </div>
    </div>
  );
}

export default LandingPage;
