import React, { useState } from 'react'
import './main.css'
import CarpoolCollection from '../Carpools/CarpoolList/CarpoolCollection'
import Button from '../../../components/utils/Button/Button'
import CreateCarpool from '../../CreateCarpool/CreateCarpool'

function Main() {

  const [showCreateCarpool, setShowCreateCarpool] = useState(false);

  const onNewCarpool = () => {
    console.log("setShowCreateCarpool: ture")
    setShowCreateCarpool(true);
  }
  const onCancleCreateCarpool = () => {
    setShowCreateCarpool(false);
  }

  return (
    <div id="main">
      <Button text="New Carpool" onClick={onNewCarpool} />
      <CreateCarpool visible={showCreateCarpool} onCancleCreateCarpool={onCancleCreateCarpool} />
      <CarpoolCollection />
    </div>
  )
}

export default Main