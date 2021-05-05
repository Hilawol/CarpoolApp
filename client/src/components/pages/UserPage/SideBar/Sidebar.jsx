import React from 'react';
import './sidebar.css';
import IconBtn from '../../../utils/Button/IconBtn';

function Sidebar({ onBtnClick }) {

  return (
    <div id="sidebar">
      {/* <IconBtn id="transactionsBtn" className="sideBarBtn" iconClass="far fa-calendar-alt" onBtnClick={onBtnClick} /> */}
      <IconBtn id="accountsBtn" className="sideBarBtn" iconClass="fas fa-car" onBtnClick={onBtnClick} />
      <IconBtn id="usersBtn" className="sideBarBtn" iconClass="fas fa-users" onBtnClick={onBtnClick} />
    </div>
  )
}

export default Sidebar
