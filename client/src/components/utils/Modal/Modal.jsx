import React from 'react'
import './modal.css'

function Modal({ content, visible }) {
  return (
    visible ?
      <div className="modal">
        {content}
      </div> :
      null
  )
}

export default Modal
