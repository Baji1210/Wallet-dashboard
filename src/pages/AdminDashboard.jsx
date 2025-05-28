import React from 'react'
import './AdminDashboard.css'
import AdminLogo from '../components/navbarComponents/AdminLogo'
import Navigations from '../components/navbarComponents/Navigations'
import HeaderSection from '../components/sidebarComponents/HeaderSection'
import FooterSection from '../components/sidebarComponents/FooterSection'
import BodySection from '../components/sidebarComponents/BodySection'
import CopyRight from '../components/footerComponents/CopyRight'
import { Outlet } from 'react-router-dom'
const AdminDashboard = () => {
  return (
    <div className='AdminDashboard'>
      <nav className='nav'>
        <div className="logosection">
          <AdminLogo/>
        </div>
        <div className="navigations">
          <Navigations/>
        </div>
      </nav>
      <aside className='aside'>
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
      <main className='main'>
        <div className="mainsection">
          <Outlet/>
        </div>
      </main>
      <footer className='footer'>
        <div className="copyright">
          <CopyRight/>
        </div>
      </footer>
     
    </div>
  )
}

export default AdminDashboard
