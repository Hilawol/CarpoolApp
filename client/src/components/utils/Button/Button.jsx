import React from 'react'
import './button.css'

function Button({ type, className, size, color, variant, text, onClick }) {
  return (
    <button type={type} className={`btn ${className} ${size} ${color} ${variant}`} onClick={onClick}>{text}</button>
  )
}

export default Button
