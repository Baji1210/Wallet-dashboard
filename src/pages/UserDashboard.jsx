import React from 'react'
import './UserDashboard.css'
import AdminLogo from '../components/navbarComponents/AdminLogo'
import Navigations from '../components/navbarComponents/Navigations'
import HeaderSection from '../components/sidebarComponents/HeaderSection'
import FooterSection from '../components/sidebarComponents/FooterSection'
import BodySection from '../components/sidebarComponents/BodySection'
import CopyRight from '../components/footerComponents/CopyRight'
import { Outlet } from 'react-router-dom'
const UserDashboard = () => {
 
  return (
    <div className='UserDashboard'>
      <nav className='navbar'>
          <div className="logosection">
            <AdminLogo/>
          </div>
          <div className="navigations">
            <Navigations/>
          </div>
      </nav>
      <aside className='asidebar'>
        <div className="sidebar">
          <div className="head">
            <HeaderSection/>
          </div>
          <div className="body">
            <BodySection/>
          </div>
          <div className="foot">
            <FooterSection/>
          </div>
        </div>
      </aside>
      <main className='mainbar'>
        <div className="mainsection">
          <Outlet/>
        </div>
      </main>
      <footer className='footerbar'>
        <div className="copyright">
          <CopyRight/>
        </div>
      </footer>
      {/* <button onClick={handleLogout}>Logout</button> */}
    </div>
  )
}

export default UserDashboard
