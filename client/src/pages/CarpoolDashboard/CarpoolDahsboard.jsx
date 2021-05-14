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
      {/* <h2>Ballet Class</h2> */}
      <div className="drivesContainer">
        {drives
          .filter((d) => d.type === "outbound")
          .map((drive) => (
            <Drive
              key={drive._id}
              userToken={userToken}
              id={drive._id}
              type={drive.type}
              from={drive.from}
              to={drive.to}
              date={moment(drive.date).format("DD.MM.YYYY HH:mm")}
              user={user}
            />
          ))}
      </div>
      <div className="drivesContainer">
        {drives
          .filter((d) => d.type === "inbound")
          .map((drive) => (
            <Drive
              key={drive._id}
              userToken={userToken}
              id={drive._id}
              type={drive.type}
              from={drive.from}
              to={drive.to}
              date={moment(drive.date).format("DD.MM.YYYY HH:mm")}
              user={user}
            />
          ))}
      </div>
      {/* <div className="passengersContainer"></div> */}
    </div>
  );
}

export default CarpoolDahsboard;
