import { useState } from 'react';
import './CustomerManagement.css'
import { useOutletContext } from 'react-router-dom'

const CustomerManagement = () => {
    const { cmgFullKycLimits ,cmgMinimalKycLimits , cmgNoKycLimits } = useOutletContext();

    const [viewMore, setViewMore] = useState(false);
    // Track editing per KYC type
    const [editing, setEditing] = useState({ type: null, rowId: null, field: null, value: '' });

    const handleEditClick = (kycType, rowId, field, value) => {
        setEditing({ type: kycType, rowId, field, value });
    };

    const handleInputChange = (e) => {
        setEditing((prev) => ({ ...prev, value: e.target.value }));
    };

    const handleSave = () => {
        setEditing({ type: null, rowId: null, field: null, value: '' });
    };

    const renderRows = (data, limitType, kycType) => {
        if (!Array.isArray(data)) return null;
        return data.slice(0, 4).map((item) => (
            <tr key={item.id + limitType}>
                <td>{item.pm}</td>
                <td>{item.gid}</td>
                <td>{item.gname}</td>
                <td>
                    {editing.type === kycType && editing.rowId === item.id && editing.field === limitType ? (
                        <input
                            type="text"
                            value={editing.value}
                            onChange={handleInputChange}
                            style={{width:'100px'}}
                        />
                    ) : (
                        <span>{item[limitType]}</span>
                    )}
                </td>
                <td>
                    {editing.type === kycType && editing.rowId === item.id && editing.field === limitType ? (
                        <button onClick={handleSave} style={{height:30}}>Save</button>
                    ) : (
                        <img
                            src="/assets/main/edit.png"
                            alt="edit"
                            style={{width:'18px',height:'18px',cursor:'pointer'}}
                            onClick={() => handleEditClick(kycType, item.id, limitType, item[limitType])}
                        />
                    )}
                </td>
            </tr>
        ));
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
                            {renderRows(cmgFullKycLimits, 'UpperLimits', 'fullKyc')}
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
                            {renderRows(cmgFullKycLimits, 'lowerlimit', 'fullKyc')}
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
                            {renderRows(cmgMinimalKycLimits, 'UpperLimits', 'minimalKyc')}
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
                        {renderRows(cmgMinimalKycLimits, 'lowerlimit', 'minimalKyc')}
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
                                    {renderRows(cmgNoKycLimits, 'UpperLimits', 'noKyc')}
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
                                {renderRows(cmgNoKycLimits, 'lowerlimit', 'noKyc')}
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





