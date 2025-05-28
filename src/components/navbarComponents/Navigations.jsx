import React from 'react'
import './Navigations.css'
import { NavLink } from 'react-router-dom'
const Navigations = () => {
  return (
    <div className='navigation'>
      <div className="NavLinks">
        <NavLink to={'/superadmin/Metrics'}>Metrics</NavLink>
        <NavLink to={'/superadmin/Payment'}>Payment</NavLink>
        <NavLink to={'/superadmin/walletlimits'}>Settings</NavLink>
        <NavLink to={'/superadmin/UpTime'}>Up Time</NavLink>
      </div>
      <div className="profileicon">
        <img src="/assets/navbar/Profile.png" alt="Profile"/>
      </div>
    </div>
  )
}

export default Navigations
