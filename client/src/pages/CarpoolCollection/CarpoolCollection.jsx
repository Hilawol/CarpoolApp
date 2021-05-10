import React, { useEffect } from 'react'
import CarpoolComponent from '../CarpoolComponent/CarpoolComponent'
import './carpoolCollection.css'

function CarpoolCollection({ title, carpools, onCarpoolClick }) {
  useEffect(() => {

  }, [carpools]);
  return (
    <div className="carpoolCollection">
      <h1>{title}</h1>
      {carpools?.length > 0 ?
        carpools.map((carpool, index) => <CarpoolComponent key={index} carpool={carpool} onCarpoolClick={onCarpoolClick} />) :
        <h3>No carpools yet</h3>
      }
    </div>
  )
}

export default CarpoolCollection
