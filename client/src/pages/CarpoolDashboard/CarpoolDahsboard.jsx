import React, { useState, useEffect } from "react";
import "./carpoolDashboard.css";
import Drive from "./Drive/Drive";
import Api from "../../Api/Api";
import moment from "moment";

function CarpoolDahsboard({ carpoolId, user, userToken }) {
  const [drives, setDrives] = useState([]);

  useEffect(() => {
    //get all carpool drives
    const getDrives = async () => {
      try {
        const { data } = await Api.get(`/carpools/${carpoolId}/drives/`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        console.log("data=", data);
        setDrives(data);
      } catch (error) {
        console.log(error);
      }
    };
    getDrives();
  }, []);

  return (
    <div className="CarpoolDashBoard">
      <div className="drivesContainer">
        <h2>Ballet Class</h2>
        {drives.map((drive) => (
          <Drive
            // key={drive_id}
            type={drive.type}
            from={drive.from}
            to={drive.to}
            date={moment(drive.date).format("DD.MM.YYYY HH:mm")}
            driverName={`${user.firstName} ${user.lastName}`}
          />
        ))}
        {/* <Drive
          type="inbound"
          from="Home"
          to="Studio"
          date="16/03/2022 17:30"
          }
        /> */}
      </div>
      <div className="passengersContainer"></div>
    </div>
  );
}

export default CarpoolDahsboard;
