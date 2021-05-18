import React, { useState, useEffect } from "react";
import "./carpoolDashboard.css";
import Drive from "./Drive/Drive";
import Api from "../../Api/Api";
import moment from "moment";
import AddPassengers from "./AddPassengers/AddPassengers";

function CarpoolDahsboard({ carpool, user, userToken }) {
  const [drives, setDrives] = useState([]);
  const [showAddPassenger, setShowAddPassenger] = useState(false);

  useEffect(() => {
    //get all carpool drives
    const getDrives = async () => {
      try {
        const { data } = await Api.get(`/carpools/${carpool._id}/drives/`, {
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

  const openAddPassengers = () => {
    console.log("open");
    setShowAddPassenger(true);
  };

  const closeAddPassengers = () => {
    setShowAddPassenger(false);
  };

  const onAddPassenger = async (addData) => {
    try {
      closeAddPassengers();
      console.log(addData);
      // const { data } = await Api.post(`/users/me/passengers/drives`, addData, {
      //   headers: { Authorization: `Bearer ${userToken}` },
      // });
      // console.log(data);
    } catch (error) {}
  };
  return (
    <div className="CarpoolDashBoard">
      <div className="carpoolHeader">
        <h1>{carpool.name} Carpool</h1>
        <div className="rowFlex">
          <button onClick={openAddPassengers} className="addPassBtn">
            <i className="fas fa-user-plus inviteIcon"></i>
            <span className="inviteText">Add Passengers</span>
          </button>
          <button onClick={() => {}} className="inviteBtn ">
            <i className="fas fa-paper-plane inviteIcon"></i>
            <span className="inviteText">Invite Friends</span>
          </button>
        </div>
      </div>
      <div className="drives">
        <div className="driveContainer">
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
                onAddPassenger={openAddPassengers}
              />
            ))}
        </div>
        <div className="driveContainer">
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
                onAddPassenger={openAddPassengers}
              />
            ))}
        </div>
      </div>

      {setShowAddPassenger ? (
        <AddPassengers
          passengersArray={user.passengers}
          drivesArray={drives}
          visible={showAddPassenger}
          onCloseClick={closeAddPassengers}
          onAddClick={onAddPassenger}
        />
      ) : null}
      {/* <div className="passengersContainer"></div> */}
    </div>
  );
}

export default CarpoolDahsboard;
