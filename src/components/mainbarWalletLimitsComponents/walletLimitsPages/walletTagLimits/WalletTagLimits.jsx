import React, { useState } from 'react';
import './WalletTagLimits.css';
import { useOutletContext } from 'react-router-dom';

const API_BASE = '/api/wallet-tag-limits'; // <-- Change this if your backend uses a different route

const WalletTagLimits = () => {
  const { walletTagFullKycLimits, walletTagMinimalKycLimits, walletTagNoKycLimits } = useOutletContext();
  const [viewMore, setViewMore] = useState(false);
  const [showAllFullUpper, setShowAllFullUpper] = useState(false);
  const [showAllFullLower, setShowAllFullLower] = useState(false);
  const [showAllMinimalUpper, setShowAllMinimalUpper] = useState(false);
  const [showAllMinimalLower, setShowAllMinimalLower] = useState(false);
  const [showAllNoUpper, setShowAllNoUpper] = useState(false);
  const [showAllNoLower, setShowAllNoLower] = useState(false);
  // State for editing
  const [editing, setEditing] = useState({ key: null, limitType: null });
  const [editValue, setEditValue] = useState('');
  const [fullKycLimits, setFullKycLimits] = useState(walletTagFullKycLimits);
  const [minimalKycLimits, setMinimalKycLimits] = useState(walletTagMinimalKycLimits);
  const [noKycLimits, setNoKycLimits] = useState(walletTagNoKycLimits);

  // Helper to get/set correct data array
  const getDataArray = (kycType) => {
    if (kycType === 'fullKyc') return [fullKycLimits, setFullKycLimits];
    if (kycType === 'minimalKyc') return [minimalKycLimits, setMinimalKycLimits];
    if (kycType === 'noKyc') return [noKycLimits, setNoKycLimits];
    return [[], () => {}];
  };

  const handleEditClick = (item, limitType, kycType) => {
    setEditing({ key: item.id + limitType + kycType, limitType, kycType });
    setEditValue(item[limitType]);
  };

  const getApiEndpoint = (kycType) => {
    if (kycType === 'fullKyc') return 'http://localhost:3002/FullKYCWalletTagLimits';
    if (kycType === 'minimalKyc') return 'http://localhost:3002/MinimalKYCWalletTagLimits';
    if (kycType === 'noKyc') return 'http://localhost:3002/NoKYCWalletTagLimits';
    return '';
  };

  const handleSaveClick = async (item, limitType, kycType) => {
    const [data, setData] = getDataArray(kycType);
    try {
      const endpoint = getApiEndpoint(kycType);
      if (!endpoint) throw new Error('Invalid KYC type');
      // Create updated item (json-server PUT requires full object)
      const updatedItem = { ...item, [limitType]: editValue };
      const response = await fetch(`${endpoint}/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to update limit:', response.status, errorText);
        throw new Error(`Failed to update limit: ${response.status} ${errorText}`);
      }
      // Update local state for immediate UI feedback
      const updated = data.map((row) =>
        row.id === item.id ? updatedItem : row
      );
      setData(updated);
      setEditing({ key: null, limitType: null });
      setEditValue('');
    } catch (error) {
      alert('Error updating limit: ' + error.message);
    }
  };

  const renderRows = (data, limitType, showAll, kycType) => {
    if (!Array.isArray(data)) return null;
    const rows = showAll ? data : data.slice(0, 4);
    return rows.map((item) => {
      const isEditing = editing.key === item.id + limitType + kycType;
      return (
        <tr key={item.id + limitType}>
          <td>{item.pm}</td>
          <td>{item.gid}</td>
          <td>{item.gname}</td>
          <td>{item.Tag}</td>
          <td>
            {isEditing ? (
              <input
                type="text"
                value={editValue}
                onChange={e => setEditValue(e.target.value)}
                style={{ width: '140px', height: '28px' }}
                autoFocus
              />
            ) : (
              <span>{item[limitType]}</span>
            )}
          </td>
          <td>
            {isEditing ? (
              <button onClick={() => handleSaveClick(item, limitType, kycType)} style={{ padding: '2px 8px', height: '22px' }}>Save</button>
            ) : (
              <img
                src="/assets/main/edit.png"
                alt="edit"
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                onClick={() => handleEditClick(item, limitType, kycType)}
              />
            )}
          </td>
        </tr>
      );
    });
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
            <tbody>{renderRows(fullKycLimits, 'UpperLimits', showAllFullUpper, 'fullKyc')}</tbody>
            <tfoot><tr><td colSpan={6}>
              <button>View all</button>
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
            <tbody>{renderRows(fullKycLimits, 'lowerlimit', showAllFullLower, 'fullKyc')}</tbody>
            <tfoot><tr><td colSpan={6}>
              <button>View all</button>
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
            <tbody>{renderRows(minimalKycLimits, 'UpperLimits', showAllMinimalUpper, 'minimalKyc')}</tbody>
            <tfoot><tr><td colSpan={6}>
              <button>View all</button>
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
            <tbody>{renderRows(minimalKycLimits, 'lowerlimit', showAllMinimalLower, 'minimalKyc')}</tbody>
            <tfoot><tr><td colSpan={6}>
              <button>View all</button>
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
                <tbody>{renderRows(noKycLimits, 'UpperLimits', showAllNoUpper, 'noKyc')}</tbody>
                <tfoot><tr><td colSpan={6}>
                  <button>View all</button>
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
                <tbody>{renderRows(noKycLimits, 'lowerlimit', showAllNoLower, 'noKyc')}</tbody>
                <tfoot><tr><td colSpan={6}>
                  <button>View all</button>
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
