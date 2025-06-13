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
import ManageUsers from '../components/UsersManagementComponent/ManageUsers/ManageUsers';
import CreateUsers from '../components/UsersManagementComponent/ManageUsers/Pages/CreateUsers';

const Dashboard = () => {
  return (
    <div className='Dashboard'>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/user' element={<UserDashboard />}>
          <Route index element={<LandingPage />} />
        </Route>
        <Route path='/admin' element={<AdminDashboard />}>
          <Route index element={<LandingPage />} />
        </Route>
        <Route path='/superadmin' element={<SuperadminDashboard />}>
          <Route index element={<LandingPage />} />
          <Route path='/superadmin/manageusers' element={<ManageUsers/>}>
              <Route path='createusers' element={<CreateUsers/>}/>
          </Route>
          <Route path='walletlimits' element={<WalletLimits />}>
            <Route index element={<RegulatoryAuthorityLimits />} />
            <Route path='regulatoryauthoritylimits' element={<RegulatoryAuthorityLimits />} />
            <Route path='issuerlimits' element={<IssuerLimits />} />
            <Route path='programmanagerlimits' element={<ProgramManagerLimits />} />
            <Route path='customergrouplimits' element={<CustomerManagement />} />
            <Route path='wallettaglimits' element={<WalletTagLimits/>}/>
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default Dashboard;
