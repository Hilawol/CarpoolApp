import React from 'react'
import Carpool from '../Carpool/Carpool'
import './carpoolCollection.css'

function CarpoolCollection({ carpools }) {
  return (
    <div className="carpoolCollection">
      This is CarpoolCollection
      <Carpool />
    </div>
  )
}

export default CarpoolCollection
