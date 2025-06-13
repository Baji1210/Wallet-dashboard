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
  const { walletTagFullKycLimits, walletTagMinimalKycLimits, walletTagNoKycLimits ,setViewAll ,setViewAllComp, setWalletTagFullKycLimits, setWalletTagMinimalKycLimits, setWalletTagNoKycLimits } = useOutletContext();
  const [viewMore, setViewMore] = useState(false);
  const [editing, setEditing] = useState({ id: null, field: null, value: '', kycType: null });

  const handleEditClick = (kycType, rowId, field, value) => {
    setEditing({ id: rowId, field, value, kycType });
  };

  const handleInputChange = (e) => {
    setEditing((prev) => ({ ...prev, value: e.target.value }));
  };

  const handleSave = async () => {
    // Determine endpoint based on kycType
    let endpoint = '';
    if (editing.kycType === 'fullKyc') {
      endpoint = 'FullKYCWalletTagLimits';
    } else if (editing.kycType === 'minimalKyc') {
      endpoint = 'MinimalKYCWalletTagLimits';
    } else if (editing.kycType === 'noKyc') {
      endpoint = 'NoKYCWalletTagLimits';
    }
    if (endpoint && editing.id && editing.field) {
      try {
        await fetch(`http://localhost:3002/${endpoint}/${editing.id}`,
          {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ [editing.field]: editing.value })
          }
        );
        // Update local state for immediate UI feedback
        if (editing.kycType === 'fullKyc' && typeof setWalletTagFullKycLimits === 'function') {
          setWalletTagFullKycLimits(prev =>
            prev.map(item =>
              String(item.id) === String(editing.id) ? { ...item, [editing.field]: editing.value } : item
            )
          );
        } else if (editing.kycType === 'minimalKyc' && typeof setWalletTagMinimalKycLimits === 'function') {
          setWalletTagMinimalKycLimits(prev =>
            prev.map(item =>
              String(item.id) === String(editing.id) ? { ...item, [editing.field]: editing.value } : item
            )
          );
        } else if (editing.kycType === 'noKyc' && typeof setWalletTagNoKycLimits === 'function') {
          setWalletTagNoKycLimits(prev =>
            prev.map(item =>
              String(item.id) === String(editing.id) ? { ...item, [editing.field]: editing.value } : item
            )
          );
        }
      } catch (error) {
        console.error('Failed to save data:', error);
      }
    }
    setEditing({ id: null, field: null, value: '', kycType: null });
  };

  // Helper to identify which table is being rendered
  const getKycTypeKey = (data) => {
    if (data === walletTagFullKycLimits) return 'fullKyc';
    if (data === walletTagMinimalKycLimits) return 'minimalKyc';
    if (data === walletTagNoKycLimits) return 'noKyc';
    return 'unknown';
  };

  const renderRows = (data, limitType, showAll) => {
    const kycType = getKycTypeKey(data);
    if (!Array.isArray(data)) return null;
    const rows = showAll ? data : data.slice(0, 4);
    return rows.map((item) => (
      <tr key={kycType + '-' + item.id + '-' + limitType}>
        <td>{item.pm}</td>
        <td>{item.gid}</td>
        <td>{item.gname}</td>
        <td>{item.Tag}</td>
        <td>
          {editing.kycType === kycType && editing.id === item.id && editing.field === limitType ? (
            <input
              type="text"
              value={editing.value}
              onChange={handleInputChange}
              style={{ width: '100px' }}
            />
          ) : (
            <span>{item[limitType]}</span>
          )}
        </td>
        <td>
          {editing.kycType === kycType && editing.id === item.id && editing.field === limitType ? (
            <button onClick={handleSave} style={{height:'30px',width:'auto',background:'rgba(69, 69, 69, 1)',border:'none',color:'rgba(255, 255, 255, 1)'}}>Save</button>
          ) : (
            <img
              src="/assets/main/edit.png"
              alt="edit"
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              onClick={() => handleEditClick(kycType, item.id, limitType, item[limitType])}
            />
          )}
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
