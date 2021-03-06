import React, { useState, useEffect } from "react";
import "./main.css";
import Button from "../../../components/utils/Button/Button";
import CreateCarpool from "../../CreateCarpool/CreateCarpool";
import CarpoolComponent from "../../CarpoolComponent/CarpoolComponent";
import Api from "../../../Api/Api";

function Main({ userToken, userData, onCarpoolClick }) {
  const [showCreateCarpool, setShowCreateCarpool] = useState(false);
  const [carpools, setCarpools] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const result = await Api.get("/users/me/carpools", {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      console.log("user carpools", result);
      setCarpools(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      // setErrMsg("Error occured please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      setLoading(true);
      console.log("InUseEffect");
      getUser();
    } catch (error) {
      console.log("error:", error);
      // setErrMsg("Error occured please try again.");
      setLoading(false);
    }
  }, []);

  const onNewCarpool = () => {
    console.log("setShowCreateCarpool: ture");
    setShowCreateCarpool(true);
  };

  const onCreateCarpool = (carpool) => {
    console.log("main on create", carpool);
    setCarpools([...carpools, { carpool: carpool, owner: true }]);
    onCloseCreateCarpool();
  };

  const onCloseCreateCarpool = () => {
    setShowCreateCarpool(false);
  };

  return (
    <div id="main">
      <Button
        text="New Carpool"
        onClick={onNewCarpool}
        className={"btn inviteBtn"}
      />
      <CreateCarpool
        userToken={userToken}
        visible={showCreateCarpool}
        onCreateCarpool={onCreateCarpool}
        onCloseCreateCarpool={onCloseCreateCarpool}
      />

      <div className="carpoolsContainer">
        {loading ? (
          <div>Loading...</div>
        ) : carpools?.length > 0 ? (
          carpools.map((carpool, index) => (
            <CarpoolComponent
              key={index}
              carpool={carpool}
              onCarpoolClick={onCarpoolClick}
            />
          ))
        ) : (
          <h3>No carpools yet</h3>
        )}
      </div>
    </div>
  );
}

export default Main;
