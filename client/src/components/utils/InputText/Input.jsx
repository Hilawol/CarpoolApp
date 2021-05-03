import React from 'react'

function Input({ className, placeholder, value, onChange }) {
  return (
    <input className={className} type="text" placeholder={placeholder} onChange={onChange} value={value} />
  )
}

export default Input
