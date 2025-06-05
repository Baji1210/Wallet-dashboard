import React, { useEffect, useState } from 'react'
import './WalletLimits.css'
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

const WalletLimits = () => {
  const [regLimits, setRegLimits] = useState([]);
  const [issuerLimits, setIssuerLimits] = useState([]);
  const [pmLimits, setPmLimits] = useState([]);
  const[cmgFullKycLimits,setCmgFullKycLimits] = useState([]);
  const[cmgMinimalKycLimits,setCmgMinimalKycLimits] = useState([]);
  const[cmgNoKycLimits,setCmgNoKycLimits] = useState([]);
  const[walletTagFullKycLimits,setWalletTagFullKycLimits] = useState([]);
  const[walletTagMinimalKycLimits,setWalletTagMinimalKycLimits] = useState([]);
  const[walletTagNoKycLimits,setWalletTagNoKycLimits] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); 
  const location = useLocation(); 

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const [regRes, issuerRes, pmRes,cmgFullRes,cmgMinimalRes,cmgNoRes,wtlFullRes,wtlMinimalRes,wtlNoRes] = await Promise.all([
          axios.get('http://localhost:3002/RegulatoryAuthorityLimits'), 
          axios.get('http://localhost:3002/IssuerLimits'),
          axios.get('http://localhost:3002/ProgramManagerLimits'),
          axios.get('http://localhost:3002/FullKYCCustomerGroupLimits'),
          axios.get('http://localhost:3002/MinimalKYCCustomerGroupLimits'),
          axios.get('http://localhost:3002/NoKYCCustomerGroupLimits'),
          axios.get('http://localhost:3002/FullKYCWalletTagLimits'),
          axios.get('http://localhost:3002/MinimalKYCWalletTagLimits'),
          axios.get('http://localhost:3002/NoKYCWalletTagLimits')
        ]);
        setRegLimits(regRes.data);
        setIssuerLimits(issuerRes.data);
        setPmLimits(pmRes.data);
        setCmgFullKycLimits(cmgFullRes.data);
        setCmgMinimalKycLimits(cmgMinimalRes.data);
        setCmgNoKycLimits(cmgNoRes.data);
        setWalletTagFullKycLimits(wtlFullRes.data);
        setWalletTagMinimalKycLimits(wtlMinimalRes.data);
        setWalletTagNoKycLimits(wtlNoRes.data); 
        setLoading(false);
      } catch (err) {
        console.error("Fetching Data Error", err);
        setLoading(false);
      }
    };
    fetchdata();
    const interval = setInterval(fetchdata,3000)
    return () => clearInterval(interval)
  }, []);

  if (loading) return <p>Loading the data...</p>;
  const handleclick = () => {
    navigate('/superadmin/walletlimits/regulatoryauthoritylimits');
  };

  const getLabelText = () => {
    if (location.pathname.includes('regulatoryauthoritylimits')) return 'Regulatory Authority Limits';
    if (location.pathname.includes('issuerlimits')) return 'Issuer Limits';
    if (location.pathname.includes('programmanagerlimits')) return 'Program Manager Limits';
    if (location.pathname.includes('customergrouplimits')) return 'Customer Group Limits';
    if (location.pathname.includes('wallettaglimits')) return 'Wallet Tag Limits';
    return 'Regulatory Authority Limits';
  };

  return (
    <div className='walletlimits'>

      <div className="header">
        <div className="heading">
          <h1>Wallet Limits</h1>
        </div>
        <div className="navigations">
          <div className="backicon">
            <div className="backbutton" onClick={handleclick}>
              <img src="/assets/main/backarrow.png" alt="Back" />
            </div>
          </div>
          <div className="navbuttons">
            <NavLink to='/superadmin/walletlimits/regulatoryauthoritylimits'>Regulatory Authority Limits</NavLink>
            <NavLink to='/superadmin/walletlimits/issuerlimits'>Issuer Limits</NavLink>
            <NavLink to='/superadmin/walletlimits/programmanagerlimits'>Program Manager Limits</NavLink>
            <NavLink to='/superadmin/walletlimits/customergrouplimits'>Customer Group Limits</NavLink>
            <NavLink to='/superadmin/walletlimits/wallettaglimits'>Wallet Tag Limits</NavLink>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="label">
          <h1>{getLabelText()}</h1>
        </div>
        <Outlet context={{ regLimits,setRegLimits, issuerLimits,setIssuerLimits, pmLimits , setPmLimits,cmgFullKycLimits,cmgMinimalKycLimits,cmgNoKycLimits,walletTagFullKycLimits,walletTagMinimalKycLimits,walletTagNoKycLimits}} />
      </div>
    </div>
  );
};

export default WalletLimits;
