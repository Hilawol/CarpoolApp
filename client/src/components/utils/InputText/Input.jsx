import React from 'react'

function Input({ id, className, placeholder, value, onChange }) {
  return (
    <input id={id} className={className} type="text" placeholder={placeholder} onChange={onChange} value={value} />
  )
}

export default Input
