import React, { useState } from 'react';
import './WalletTagLimits.css';
import { useOutletContext } from 'react-router-dom';
import FullKycWalletTagUpperLimits from './ViewAllPages/FullKycWalletTagLimits/UpperLimits/FullKycWalletTagUpperLimits';
import FullKycWalletTagLowerLimits from './ViewAllPages/FullKycWalletTagLimits/LowerLimits/FullKycWalletTagLowerLimits';
import MinimalKycWalletTagLowerLimits from './ViewAllPages/MinimalKycWalletTagLimits/LowerLimits/MinimalKycWalletTagLowerLimits';
import MinimalKycWalletTagUpperLimits from './ViewAllPages/MinimalKycWalletTagLimits/UpperLimits/MinimalKycWalletTagUpperLimits';
import NoKycWalletTagUpperLimits from './ViewAllPages/NoKycWalletTagLimits/UpperLimits/NoKycWalletTagUpperLimits';
import NoKycWalletTagLowerLimits from './ViewAllPages/NoKycWalletTagLimits/LowerLimits/NoKycWalletTagLowerLimits';

const WalletTagLimits = () => {
  const { walletTagFullKycLimits, walletTagMinimalKycLimits, walletTagNoKycLimits ,setViewAll ,setViewAllComp} = useOutletContext();
  const [viewMore, setViewMore] = useState(false);
  // const [showAll, setShowAll] = useState(false);

  const renderRows = (data, limitType, showAll, kycType) => {
    if (!Array.isArray(data)) return null;
    const rows = showAll ? data : data.slice(0, 4);
    return rows.map((item) => (
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
            // onClick handler can be added for edit functionality if needed
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
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>{renderRows(walletTagFullKycLimits, 'UpperLimits')}</tbody>
            <tfoot><tr><td colSpan={6}>
              <button
              onClick={() => {
                setViewAll(true);
                setViewAllComp(() => FullKycWalletTagUpperLimits);
                }}>View all</button>
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
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>{renderRows(walletTagFullKycLimits, 'lowerlimit')}</tbody>
            <tfoot><tr><td colSpan={6}>
              <button
              onClick={() => {
                setViewAll(true);
                setViewAllComp(() => FullKycWalletTagLowerLimits);
                }}>View all</button>
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
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>{renderRows(walletTagMinimalKycLimits, 'UpperLimits')}</tbody>
            <tfoot><tr><td colSpan={6}>
              <button
              onClick={() => {
                setViewAll(true);
                setViewAllComp(() => MinimalKycWalletTagUpperLimits);
                }}>View all</button>
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
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>{renderRows(walletTagMinimalKycLimits, 'lowerlimit')}</tbody>
            <tfoot><tr><td colSpan={6}>
              <button
              onClick={() => {
                setViewAll(true);
                setViewAllComp(() => MinimalKycWalletTagLowerLimits);
                }}>View all</button>
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
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>{renderRows(walletTagNoKycLimits, 'UpperLimits')}</tbody>
                <tfoot><tr><td colSpan={6}>
                  <button
                    onClick={() => {
                      setViewAll(true);
                      setViewAllComp(() => NoKycWalletTagUpperLimits);
                      }}>View all</button>
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
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>{renderRows(walletTagNoKycLimits, 'lowerlimit')}</tbody>
                <tfoot><tr><td colSpan={6}>
                  <button
                  onClick={() => {
                    setViewAll(true);
                    setViewAllComp(() => NoKycWalletTagLowerLimits);
                    }}>View all</button>
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
