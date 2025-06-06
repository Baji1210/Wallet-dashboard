import React, { useState } from 'react';
import './WalletTagLimits.css';
import { useOutletContext } from 'react-router-dom';

const WalletTagLimits = () => {
  const { walletTagFullKycLimits, walletTagMinimalKycLimits, walletTagNoKycLimits, handleViewAll } = useOutletContext();
  const [viewMore, setViewMore] = useState(false);
  const [showAllFullUpper, setShowAllFullUpper] = useState(false);
  const [showAllFullLower, setShowAllFullLower] = useState(false);
  const [showAllMinimalUpper, setShowAllMinimalUpper] = useState(false);
  const [showAllMinimalLower, setShowAllMinimalLower] = useState(false);
  const [showAllNoUpper, setShowAllNoUpper] = useState(false);
  const [showAllNoLower, setShowAllNoLower] = useState(false);

  const renderRows = (data, limitType, showAll, kycType, tableTitle) => {
    if (!Array.isArray(data)) return null;
    const rows = showAll ? data : data.slice(0, 4);
    return rows.map((item, idx) => (
      <tr key={item.id + limitType}>
        <td>{item.pm}</td>
        <td>{item.gid}</td>
        <td>{item.gname}</td>
        <td>{item.Tag}</td>
        <td>
          <span>{item[limitType]}</span>
        </td>
        <td>
          <img
            src="/assets/main/edit.png"
            alt="edit"
            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
          />
        </td>
      </tr>
    ));
  };

  return (
    <div className={`wallettaglimits${viewMore ? ' nokyc-scroll-parent' : ''}`} style={viewMore ? { maxHeight: '90vh', overflowY: 'auto', overflowX: 'hidden' } : {}}>
      {/* Full KYC Wallet Tag Limits */}
      <div className='heading'><h1>Full KYC Wallet Tag Limits</h1></div>
      <div className='tables'>
        <div className='upper-limits'>
          <table>
            <thead>
              <tr><th colSpan={6}>Upper Limits</th></tr>
              <tr>
                <th>Program Manager</th>
                <th>Group ID</th>
                <th>Group Name</th>
                <th>Tag</th>
                <th>Limit</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{renderRows(walletTagFullKycLimits, 'UpperLimits', showAllFullUpper, 'fullKyc')}</tbody>
            <tfoot><tr><td colSpan={6}>
              <button onClick={() => handleViewAll('full-upper', walletTagFullKycLimits, 'Full KYC Wallet Tag Upper Limits')}>View all</button>
            </td></tr></tfoot>
          </table>
        </div>
        <div className='Lower-limits'>
          <table>
            <thead>
              <tr><th colSpan={6}>Lower Limits</th></tr>
              <tr>
                <th>Program Manager</th>
                <th>Group ID</th>
                <th>Group Name</th>
                <th>Tag</th>
                <th>Limit</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{renderRows(walletTagFullKycLimits, 'lowerlimit', showAllFullLower, 'fullKyc')}</tbody>
            <tfoot><tr><td colSpan={6}>
              <button onClick={() => handleViewAll('full-lower', walletTagFullKycLimits, 'Full KYC Wallet Tag Lower Limits')}>View all</button>
            </td></tr></tfoot>
          </table>
        </div>
      </div>
      {/* Minimal KYC Wallet Tag Limits */}
      <div className='heading'><h1>Minimal KYC Wallet Tag Limits</h1></div>
      <div className='tables'>
        <div className='upper-limits'>
          <table>
            <thead>
              <tr><th colSpan={6}>Upper Limits</th></tr>
              <tr>
                <th>Program Manager</th>
                <th>Group ID</th>
                <th>Group Name</th>
                <th>Tag</th>
                <th>Limit</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{renderRows(walletTagMinimalKycLimits, 'UpperLimits', showAllMinimalUpper, 'minimalKyc')}</tbody>
            <tfoot><tr><td colSpan={6}>
              <button onClick={() => handleViewAll('minimal-upper', walletTagMinimalKycLimits, 'Minimal KYC Wallet Tag Upper Limits')}>View all</button>
            </td></tr></tfoot>
          </table>
        </div>
        <div className='Lower-limits'>
          <table>
            <thead>
              <tr><th colSpan={6}>Lower Limits</th></tr>
              <tr>
                <th>Program Manager</th>
                <th>Group ID</th>
                <th>Group Name</th>
                <th>Tag</th>
                <th>Limit</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{renderRows(walletTagMinimalKycLimits, 'lowerlimit', showAllMinimalLower, 'minimalKyc')}</tbody>
            <tfoot><tr><td colSpan={6}>
              <button onClick={() => handleViewAll('minimal-lower', walletTagMinimalKycLimits, 'Minimal KYC Wallet Tag Lower Limits')}>View all</button>
            </td></tr></tfoot>
          </table>
        </div>
      </div>
      {/* No KYC Wallet Tag Limits (view more) */}
      {viewMore ? (
        <>
          <div className='heading'><h1>No KYC Wallet Tag Limits</h1></div>
          <div className='tables'>
            <div className='upper-limits'>
              <table>
                <thead>
                  <tr><th colSpan={6}>Upper Limits</th></tr>
                  <tr>
                    <th>Program Manager</th>
                    <th>Group ID</th>
                    <th>Group Name</th>
                    <th>Tag</th>
                    <th>Limit</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>{renderRows(walletTagNoKycLimits, 'UpperLimits', showAllNoUpper, 'noKyc')}</tbody>
                <tfoot><tr><td colSpan={6}>
                  <button onClick={() => handleViewAll('no-upper', walletTagNoKycLimits, 'No KYC Wallet Tag Upper Limits')}>View all</button>
                </td></tr></tfoot>
              </table>
            </div>
            <div className='Lower-limits'>
              <table>
                <thead>
                  <tr><th colSpan={6}>Lower Limits</th></tr>
                  <tr>
                    <th>Program Manager</th>
                    <th>Group ID</th>
                    <th>Group Name</th>
                    <th>Tag</th>
                    <th>Limit</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>{renderRows(walletTagNoKycLimits, 'lowerlimit', showAllNoLower, 'noKyc')}</tbody>
                <tfoot><tr><td colSpan={6}>
                  <button onClick={() => handleViewAll('no-lower', walletTagNoKycLimits, 'No KYC Wallet Tag Lower Limits')}>View all</button>
                </td></tr></tfoot>
              </table>
            </div>
          </div>
          <button className='view-all-btn' onClick={() => setViewMore(false)} >View less</button>
        </>
      ) : (
        <button className='view-all-btn' onClick={() => setViewMore(true)}>View more</button>
      )}
    </div>
  );
};

export default WalletTagLimits;
