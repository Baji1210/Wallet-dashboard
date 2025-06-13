import React from 'react'
import './FooterSection.css'
import { useNavigate } from 'react-router-dom'
const FooterSection = () => {
    const navigate = useNavigate()
    const handleUsers = () => {
      navigate('/superadmin/manageusers')
    }
    const handleLogout = ()=>{
        navigate('/')
    }
  return (
    <div className='footerSection'>
      <hr />
      <div className="ManageUsers">
        <div className="image">
          <img src="/assets/sidebar/Manageusers.png" alt="" onClick={handleUsers} />
        </div>
        <div className="heading">
          <h1>ManageUsers</h1>
        </div>
      </div>
      <div className="Logout">
        <div className="image">
          <img src="/assets/sidebar/logout.png" alt="logout" style={{cursor:'pointer'}} onClick={handleLogout} />
        </div>
        <div className="heading">
          <h1>Logout</h1>
        </div>
      </div>
    </div>
  )
}

export default FooterSection
