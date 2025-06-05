import React, { useState } from 'react'
import './Navigations.css'
import { NavLink } from 'react-router-dom'

const Navigations = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(() => {
    const userStr = localStorage.getItem('loggedInUser');
    return userStr ? JSON.parse(userStr) : null;
  });

  const handleProfileClick = () => setShowProfile(true);
  const handleClose = () => setShowProfile(false);

  return (
    <div className='navigation'>
      <div className="NavLinks">
        <NavLink to={'/superadmin/Metrics'}>Metrics</NavLink>
        <NavLink to={'/superadmin/Payment'}>Payment</NavLink>
        <NavLink to={'/superadmin/walletlimits'}>Settings</NavLink>
        <NavLink to={'/superadmin/UpTime'}>Up Time</NavLink>
      </div>
      <div className="profileicon">
        <img src="/assets/navbar/Profile.png" alt="Profile" onClick={handleProfileClick}/>
      </div>
      {showProfile && user && (
        <div className="profile-modal" style={{position:'absolute',top:60,right:20,background:'#fff',border:'1px solid #ccc',borderRadius:8,padding:20,zIndex:1000}}>
          <h3>Profile Details</h3>
          <p><b>Username:</b> {user.username}</p>
          <p><b>Email:</b> {user.email || user.Email}</p>
          <p><b>Role:</b> {user.role}</p>
          <button onClick={handleClose} style={{marginTop:10}}>Close</button>
        </div>
      )}
    </div>
  )
}

export default Navigations
