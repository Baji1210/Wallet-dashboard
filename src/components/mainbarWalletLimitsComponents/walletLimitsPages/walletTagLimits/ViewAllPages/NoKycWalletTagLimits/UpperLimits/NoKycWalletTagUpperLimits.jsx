import React from 'react'
import './NoKycWalletTagUpperLimits.css'

const NoKycWalletTagUpperLimits = ({ walletTagNoKycLimits, setViewAll }) => {
  const [editingRow, setEditingRow] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [localData, setLocalData] = React.useState(walletTagNoKycLimits);

  React.useEffect(() => {
    setLocalData(walletTagNoKycLimits);
  }, [walletTagNoKycLimits]);

  const handleEditClick = (row) => {
    setEditingRow(row.id);
    setInputValue(row.UpperLimits);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSave = async () => {
    if (!editingRow) return;
    // Update UI immediately
    setLocalData(prev => prev.map(item =>
      item.id === editingRow ? { ...item, UpperLimits: inputValue } : item
    ));
    setEditingRow(null);
    // Send to server
    try {
      await fetch(`http://localhost:3002/NoKYCWalletTagLimits/${editingRow}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ UpperLimits: inputValue })
      });
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  };

  return (
    <div className='NoKycUL'>
      <div className="container">
        <div className="heading">
          <h1>Wallet Tag(NO KYC Limits)</h1>
        </div>
        <div className="table-data-container">
          <div className="table-header">
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
            </table>
            <div className="close" onClick={() => setViewAll(false)} >
              <img src="/assets/main/Close.png" alt="Close" />
            </div>
          </div>
          <div className="tbody-scroll">
            <table className="table-body">
              <tbody>
                {localData.map((item, index) => (
                  <tr key={index || item.id}>
                    <td>{item.pm}</td>
                    <td>{item.gid}</td>
                    <td>{item.gname}</td>
                    <td>{item.Tag}</td>
                    <td>
                      {editingRow === item.id ? (
                        <input
                          type="text"
                          value={inputValue}
                          onChange={handleInputChange}
                          style={{ width: '100px' }}
                        />
                      ) : (
                        item.UpperLimits
                      )}
                    </td>
                    <td>
                        <img
                          style={{cursor:'pointer'}}
                          src="/assets/main/edit.png"
                          alt="edit"
                          onClick={() => handleEditClick(item)}
                        />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="table-footer">
            <table style={{background:'red'}}>
              <tfoot>
                <tr>
                  <td>
                    <button onClick={handleSave}>save</button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoKycWalletTagUpperLimits
