import React, { useState, useEffect } from 'react'
import './main.css'
import CarpoolCollection from '../../CarpoolCollection/CarpoolCollection'
import Button from '../../../components/utils/Button/Button'
import CreateCarpool from '../../CreateCarpool/CreateCarpool'
import Api from '../../../Api/Api'

function Main({ userToken, userData, onCarpoolClick }) {

  const [showCreateCarpool, setShowCreateCarpool] = useState(false);
  const [carpools, setCarpools] = useState(null);

  useEffect(() => {
    setCarpools(userData.carpools);
    console.log(userData.carpools);
  }, [userData])

  const onNewCarpool = () => {
    console.log("setShowCreateCarpool: ture")
    setShowCreateCarpool(true);
  }
  const onCreateCarpool = (carpool) => {
    setCarpools([...carpools, carpool]);
    onCloseCreateCarpool();
  }
  const onCloseCreateCarpool = () => {
    setShowCreateCarpool(false);
  }

  return (
    <div id="main">
      <Button text="New Carpool" onClick={onNewCarpool} />
      <CreateCarpool userToken={userToken} visible={showCreateCarpool} onCreateCarpool={onCreateCarpool} onCloseCreateCarpool={onCloseCreateCarpool} />
      <CarpoolCollection carpools={carpools} onCarpoolClick={onCarpoolClick} />
    </div>
  )
}

export default Main
