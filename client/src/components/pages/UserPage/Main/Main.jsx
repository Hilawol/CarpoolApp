import React from 'react'
import CollectionTable from '../CollectionTable/CollectionTable'
import './main.css'

function Main({ view }) {
  return (
    <div id="main">
      <CollectionTable view={view} />
    </div>
  )
}

export default Main
