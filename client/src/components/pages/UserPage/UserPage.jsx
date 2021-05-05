import React from 'react'
import Button from '../../utils/Button/Button'
import Sidebar from './SideBar/Sidebar';
import TopBar from './TopBar/TopBar';

function UserPage() {

  const createCarpool = () => {
    console.log("create carpool");
  }

  const addPassenger = () => {
    console.log("add passenger");
  }

  return (
    <div className="userPage">
      <TopBar />
      <Sidebar />
      {/* <Button text="Create Carpool" onClick={createCarpool} />
      <Button text="Add Passenger" onClick={addPassenger} /> */}
    </div>
  )
}

export default UserPage
