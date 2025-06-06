import React, { useState, useMemo } from 'react'
import './Navigations.css'
import { NavLink } from 'react-router-dom'

const Navigations = () => {
  const [showProfile, setShowProfile] = useState(false);
  // Get user from localStorage
  const user = useMemo(() => {
    const userStr = localStorage.getItem('loggedInUser');
    return userStr ? JSON.parse(userStr) : null;
  }, []);

  const handleProfileClick = () => setShowProfile(true);
  const handleClose = () => setShowProfile(false);

  return (
    <div className='navigation'>
      <div className="NavLinks">
        {user && user.role === 'superadmin' && (
          <>
            <NavLink to={'/superadmin/Metrics'}>Metrics</NavLink>
            <NavLink to={'/superadmin/Payment'}>Payment</NavLink>
            <NavLink to={'/superadmin/walletlimits'}>Settings</NavLink>
            <NavLink to={'/superadmin/UpTime'}>Up Time</NavLink>
          </>
        )}
        {user && user.role === 'admin' && (
          <>
            <NavLink to={'/admin/Metrics'}>Metrics</NavLink>
            <NavLink to={'/admin/Payment'}>Payment</NavLink>
            <NavLink to={'/admin/walletlimits'}>Settings</NavLink>
            <NavLink to={'/admin/UpTime'}>Up Time</NavLink>
          </>
        )}
        {user && user.role === 'user' && (
          <>
            <NavLink to={'/user/Metrics'}>Metrics</NavLink>
            <NavLink to={'/user/Payment'}>Payment</NavLink>
            <NavLink to={'/user/walletlimits'}>Settings</NavLink>
            <NavLink to={'/user/UpTime'}>Up Time</NavLink>
          </>
        )}
        {!user && (
          <>
            <NavLink to={'/'}>Login</NavLink>
          </>
        )}
      </div>
      <div className="profileicon" onClick={handleProfileClick}>
        <img src="/assets/navbar/Profile.png" alt="Profile"/>
      </div>
      {showProfile && user && (
        <div className="profile-modal" style={{position:'absolute',top:60,right:20,background:'#fff',border:'1px solid #ccc',borderRadius:8,padding:20,zIndex:1000}}>
          <h3>Profile Details</h3>
          <p><b>Username:</b> {user.username}</p>
          <p><b>Email:</b> {user.email || user.Email}</p>
          <p><b>Role:</b> {user.role}</p>
          <button onClick={handleClose} style={{marginTop:10,cursor:'pointer'}}>Close</button>
        </div>
      )}
    </div>
  )
}

export default Navigations
