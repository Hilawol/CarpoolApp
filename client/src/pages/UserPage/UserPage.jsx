import React from 'react'
import Button from '../../components/utils/Button/Button'
import Sidebar from './SideBar/Sidebar';
import TopBar from './TopBar/TopBar';
import Main from './Main/Main';
import './userPage.css';

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
      <section className="mainSection">
        <Sidebar />
        <Main />
      </section>

      {/* <Button text="Create Carpool" onClick={createCarpool} />
      <Button text="Add Passenger" onClick={addPassenger} /> */}
    </div>
  )
}

export default UserPage
