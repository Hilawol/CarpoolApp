import React from 'react'

function Input({ id, className, placeholder, value, onChange, type }) {
  return (
    <input id={id} className={className} type={type} placeholder={placeholder} onChange={onChange} value={value} />
  )
}

export default Input
