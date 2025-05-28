import React from 'react'
import './SuperadminDashboard.css'
import AdminLogo from '../components/navbarComponents/AdminLogo'
import Navigations from '../components/navbarComponents/Navigations'
import HeaderSection from '../components/sidebarComponents/HeaderSection'
import FooterSection from '../components/sidebarComponents/FooterSection'
import BodySection from '../components/sidebarComponents/BodySection'
import CopyRight from '../components/footerComponents/CopyRight'
import { Outlet } from 'react-router-dom'
const SuperadminDashboard = () => {
  return (
    <div className='superadmin'>
      <nav>
        <div className="logosection">
          <AdminLogo/>
        </div>
        <div className="navigations">
          <Navigations/>
        </div>
      </nav>
      <aside>
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
      <main>
        <div className="mainsection">
          <Outlet/>
        </div>
      </main>
      <footer>
        <div className="copyright">
          <CopyRight/>
        </div>
      </footer>
    </div>
  )
}

export default SuperadminDashboard
