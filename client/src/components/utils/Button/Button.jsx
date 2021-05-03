import React from 'react'
import './button.css'

function Button({ className, size, color, variant, text, onClick }) {
  return (
    <button className={`btn ${className} ${size} ${color} ${variant}`} onClick={onClick}>{text}</button>
  )
}

export default Button
