import { useState } from 'react';
import './CustomerManagement.css'
import { useOutletContext } from 'react-router-dom'

const CustomerManagement = () => {
    const { 
      cmgFullKycLimits, setCmgFullKycLimits,
      cmgMinimalKycLimits, setCmgMinimalKycLimits,
      cmgNoKycLimits, setCmgNoKycLimits
    } = useOutletContext();

    const [viewMore, setViewMore] = useState(false);
    // Track editing per KYC type
    const [editing, setEditing] = useState({ type: null, rowId: null, field: null, value: '' });

    const handleEditClick = (kycType, rowId, field, value) => {
        setEditing({ type: kycType, rowId, field, value });
    };

    const handleInputChange = (e) => {
        setEditing((prev) => ({ ...prev, value: e.target.value }));
    };

    // Local state for each KYC type
    const [fullKycData, setFullKycData] = useState(cmgFullKycLimits);
    const [minimalKycData, setMinimalKycData] = useState(cmgMinimalKycLimits);
    const [noKycData, setNoKycData] = useState(cmgNoKycLimits);

    // Helper to get/set correct data array and endpoint
    const getDataArrayAndEndpoint = (kycType) => {
        if (kycType === 'fullKyc') return [fullKycData, setFullKycData, setCmgFullKycLimits, 'http://localhost:3002/FullKYCCustomerGroupLimits'];
        if (kycType === 'minimalKyc') return [minimalKycData, setMinimalKycData, setCmgMinimalKycLimits, 'http://localhost:3002/MinimalKYCCustomerGroupLimits'];
        if (kycType === 'noKyc') return [noKycData, setNoKycData, setCmgNoKycLimits, 'http://localhost:3002/NoKYCCustomerGroupLimits'];
        return [[], () => {}, () => {}, ''];
    };

    const handleSave = async () => {
        const { type, rowId, field, value } = editing;
        const [data, setData, setParentData, endpoint] = getDataArrayAndEndpoint(type);
        try {
            if (!endpoint) throw new Error('Invalid KYC type');
            const item = data.find((row) => row.id === rowId);
            if (!item) throw new Error('Item not found');
            const updatedItem = { ...item, [field]: value };
            const response = await fetch(`${endpoint}/${rowId}`, {
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
            const updated = data.map((row) => row.id === rowId ? updatedItem : row);
            setData(updated);
            if (typeof setParentData === 'function') setParentData(updated); // update parent context too
            setEditing({ type: null, rowId: null, field: null, value: '' });
        } catch (error) {
            alert('Error updating limit: ' + error.message);
        }
    };

    const renderRows = (data, limitType, kycType) => {
        if (!Array.isArray(data)) return null;
        return data.slice(0, 4).map((item) => {
            const isEditing = editing.type === kycType && editing.rowId === item.id && editing.field === limitType;
            return (
                <tr key={item.id + limitType}>
                    <td>{item.pm}</td>
                    <td>{item.gid}</td>
                    <td>{item.gname}</td>
                    <td>
                        {isEditing ? (
                            <input
                                type="text"
                                value={editing.value}
                                onChange={handleInputChange}
                                style={{ width: '140px', height: '28px' }}
                                autoFocus
                            />
                        ) : (
                            <span>{item[limitType]}</span>
                        )}
                    </td>
                    <td>
                        {isEditing ? (
                            <button onClick={handleSave} style={{ padding: '2px 8px', height: '22px' }}>Save</button>
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
            );
        });
    };

    return (
        <div className={`customermanagement${viewMore ? ' nokyc-scroll-parent' : ''}`}
            style={viewMore ? { maxHeight: '90vh', overflowY: 'auto', overflowX: 'hidden' } : {}}>
            {/* full kyc limits*/}
            <div className='heading'><h1>Full-kyc-limits</h1></div>
            <div className="tables">
                <div className="upper-limits">
                    <table>
                        <thead>
                            <tr>
                                <th colSpan={5}>Upper Limits</th>
                            </tr>
                            <tr>
                                <th>Program Manager</th>
                                <th>Group ID</th>
                                <th>Group Name</th>
                                <th>Limit</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderRows(fullKycData, 'UpperLimits', 'fullKyc')}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={5}>
                                    <button>view all</button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div className="Lower-limits">
                    <table>
                        <thead>
                            <tr>
                                <th colSpan={5}>Lower Limits</th>
                            </tr>
                            <tr>
                                <th>Program Manager</th>
                                <th>Group ID</th>
                                <th>Group Name</th>
                                <th>Limit</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderRows(fullKycData, 'lowerlimit', 'fullKyc')}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={5}>
                                    <button>view all</button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            {/* minimal kyc limits*/}
            <div className='heading'><h1>Minimal-kyc-limits</h1></div>
            <div className="tables">
                <div className="upper-limits">
                    <table>
                        <thead>
                            <tr>
                                <th colSpan={5}>Upper Limits</th>
                            </tr>
                            <tr>
                                <th>Program Manager</th>
                                <th>Group ID</th>
                                <th>Group Name</th>
                                <th>Limit</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderRows(minimalKycData, 'UpperLimits', 'minimalKyc')}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={5}>
                                    <button>view all</button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div className="Lower-limits">
                    <table>
                    <thead>
                        <tr>
                            <th colSpan={5}>Lower Limits</th>
                        </tr>
                        <tr>
                            <th>Program Manager</th>
                            <th>Group ID</th>
                            <th>Group Name</th>
                            <th>Limit</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderRows(minimalKycData, 'lowerlimit', 'minimalKyc')}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={5}>
                                <button>view all</button>
                            </td>
                        </tr>
                    </tfoot>
                    </table>
                </div>
            </div>
            {viewMore ? (
                <>
                    <div className='heading'><h1>No-kyc-limits</h1></div>
                    <div className="tables">
                        <div className="upper-limits">
                            <table>
                                <thead>
                                    <tr>
                                        <th colSpan={5}>Upper Limits</th>
                                    </tr>
                                    <tr>
                                        <th>Program Manager</th>
                                        <th>Group ID</th>
                                        <th>Group Name</th>
                                        <th>Limit</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderRows(noKycData, 'UpperLimits', 'noKyc')}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={5}>
                                            <button>view all</button>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div className="Lower-limits">
                            <table>
                            <thead>
                                <tr>
                                    <th colSpan={5}>Lower Limits</th>
                                </tr>
                                <tr>
                                    <th>Program Manager</th>
                                    <th>Group ID</th>
                                    <th>Group Name</th>
                                    <th>Limit</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderRows(noKycData, 'lowerlimit', 'noKyc')}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={5}>
                                        <button>view all</button>
                                    </td>
                                </tr>
                            </tfoot>
                            </table>
                        </div>
                    </div>
                    <button className='view-all-btn' onClick={() => setViewMore(false)} >View less</button>
                </>
            ) : (
                <button className='view-all-btn' onClick={() => setViewMore(true)}>View more</button>
            )}
        </div>
    )
}

export default CustomerManagement





