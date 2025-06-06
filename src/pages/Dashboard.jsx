import LoginPage from './LoginPage';
import { Routes, Route } from 'react-router-dom';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import SuperadminDashboard from './SuperadminDashboard';
import './Dashboard.css';
import LandingPage from '../components/mainbarWalletLimitsComponents/LandingPage';
import WalletLimits from '../components/mainbarWalletLimitsComponents/walletLimitsPages/WalletLimits';
import RegulatoryAuthorityLimits from '../components/mainbarWalletLimitsComponents/walletLimitsPages/regulatoryAuthorityLimits/RegulatoryAuthorityLimits';
import IssuerLimits from '../components/mainbarWalletLimitsComponents/walletLimitsPages/issuerLimits/IssuerLimits';
import ProgramManagerLimits from '../components/mainbarWalletLimitsComponents/walletLimitsPages/programManagerLimits/ProgramManagerLimits';
import CustomerManagement from '../components/mainbarWalletLimitsComponents/walletLimitsPages/customerGroupLimits/CustomerManagement';
import WalletTagLimits from '../components/mainbarWalletLimitsComponents/walletLimitsPages/walletTagLimits/WalletTagLimits';
import React from 'react';

const NotFound = () => (
  <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'80vh'}}>
    <h1 style={{fontSize:'3rem',color:'#d32f2f'}}>404</h1>
    <h2 style={{fontWeight:600}}>Page Not Found</h2>
    <p>The page you are looking for does not exist.</p>
  </div>
);

const Dashboard = () => {
  return (
    <div className='Dashboard'>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/user' element={<UserDashboard />}>
          <Route index element={<LandingPage />} />
          <Route path='walletlimits' element={<WalletLimits />}>
            <Route index element={<RegulatoryAuthorityLimits />} />
            <Route path='regulatoryauthoritylimits' element={<RegulatoryAuthorityLimits />} />
            <Route path='issuerlimits' element={<IssuerLimits />} />
            <Route path='programmanagerlimits' element={<ProgramManagerLimits />} />
            <Route path='customergrouplimits' element={<CustomerManagement />} />
            <Route path='wallettaglimits' element={<WalletTagLimits/>}/>
          </Route>
        </Route>
        <Route path='/admin' element={<AdminDashboard />}>
          <Route index element={<LandingPage />} />
          <Route path='walletlimits' element={<WalletLimits />}>
            <Route index element={<RegulatoryAuthorityLimits />} />
            <Route path='regulatoryauthoritylimits' element={<RegulatoryAuthorityLimits />} />
            <Route path='issuerlimits' element={<IssuerLimits />} />
            <Route path='programmanagerlimits' element={<ProgramManagerLimits />} />
            <Route path='customergrouplimits' element={<CustomerManagement />} />
            <Route path='wallettaglimits' element={<WalletTagLimits/>}/>
          </Route>
        </Route>
        <Route path='/superadmin' element={<SuperadminDashboard />}>
          <Route index element={<LandingPage />} />
          <Route path='walletlimits' element={<WalletLimits />}>
            <Route index element={<RegulatoryAuthorityLimits />} />
            <Route path='regulatoryauthoritylimits' element={<RegulatoryAuthorityLimits />} />
            <Route path='issuerlimits' element={<IssuerLimits />} />
            <Route path='programmanagerlimits' element={<ProgramManagerLimits />} />
            <Route path='customergrouplimits' element={<CustomerManagement />} />
            <Route path='wallettaglimits' element={<WalletTagLimits/>}/>
          </Route>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
