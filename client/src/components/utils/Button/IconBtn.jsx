import React from 'react';

function IconBtn({ id, className, iconClass, onBtnClick }) {

  const onClick = (event) => {
    onBtnClick(event.currentTarget.id);
  }

  return (
    <div id={id} className={className} onClick={onClick} >
      <i className={iconClass} ></i>
    </div>
  )
}

export default IconBtn
