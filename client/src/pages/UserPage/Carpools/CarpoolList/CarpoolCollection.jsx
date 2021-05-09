import React, { useEffect } from 'react'
import Carpool from '../Carpool/Carpool'
import './carpoolCollection.css'

function CarpoolCollection({ title, carpools }) {
  useEffect(() => {

  }, [carpools]);
  return (
    <div className="carpoolCollection">
      <h1>{title}</h1>
      {carpools?.length > 0 ?
        carpools.map((carpool, index) => <Carpool key={index} carpool={carpool} />) :
        <h3>No carpools yet</h3>
      }
    </div>
  )
}

export default CarpoolCollection
