import React from 'react'
import Button from '../../../components/utils/Button/Button'
import './topBar.css'

function TopBar({ onLogoutClick, onBtnClick }) {
  return (
    <div id="topBar">
      <Button id="createCarpool" className="topBarBtn" text="Create Carpool" variant="text" onClick={onBtnClick} />
      <Button id="addPassengers" className="topBarBtn" text="Add Passengers" variant="text" onClick={onBtnClick} />
      <Button id="logout" className="topBarBtn" text="Logout" variant="text" onClick={onLogoutClick} />
    </div>
  )
}

export default TopBar
