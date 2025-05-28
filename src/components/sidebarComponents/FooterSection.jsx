import React from 'react'
import './FooterSection.css'
import { useNavigate } from 'react-router-dom'
const FooterSection = () => {
    const navigate = useNavigate()
    const handleLogout = ()=>{
        navigate('/')
    }
  return (
    <div className='footersections'>
      <hr />
      <img src="/assets/sidebar/logout.png" alt="logout" onClick={handleLogout} />
      <h1>Logout</h1>
    </div>
  )
}

export default FooterSection
