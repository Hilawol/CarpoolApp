import React from 'react'
import './carpoolDashboard.css'
import Drive from './Drive/Drive'

function CarpoolDahsboard({carpoolId,user}) {

  return (
    <div className="CarpoolDashBoard">
      <div className="drivesContainer">
        <h2>Ballet Class</h2>
        <Drive type="inbound" from="Home" to="Studio" date="16/03/2022 17:30" driverName={ `${user.firstName} ${user.lastName}`}/>
        <Drive type="outbound" from="Studio" to="Home" date="16/03/2022 21:30" driverName={ `${user.firstName} ${user.lastName}`}  />
      </div>
      <div className="passengersContainer">

      </div>
    </div>
  )
}

export default CarpoolDahsboard
