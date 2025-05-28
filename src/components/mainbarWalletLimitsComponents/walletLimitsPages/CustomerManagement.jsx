import React from 'react'
import './CustomerManagement.css'
import { useOutletContext } from 'react-router-dom'
const CustomerManagement = () => {
    const {cmgLimits} = useOutletContext()
  return (
    <div className='customermanagement'>
      <div className="full-kyc">
        <div className="heading"><h1>Full KYC Limits </h1></div>
        <div className="body">
            <div className="upperlimits">
                <table>
                    <thead>
                        <tr>
                            <th colSpan={4}>Upper Limits</th>
                        </tr>
                        <tr>
                            <th>Program Manager</th>
                            <th>Group ID</th>
                            <th>Group Name</th>
                            <th>Limit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cmgLimits.slice(0,4).map((item) => {
                            return(
                                <>
                                    <tr>
                                        <td>{item.pm}</td>
                                        <td>{item.gid}</td>
                                        <td>{item.gname}</td>
                                        <td>{item.UpperLimits}</td>
                                    </tr>
                                </>
                            )
                        })}
                    </tbody>
                    <tfoot>
                    <tr>
                        <td colSpan={4}><button>save</button></td>
                    </tr>
                    </tfoot>
                </table>
            </div>
        <div className="lowerlimits">
            <table>
                <thead>
                    <tr>
                        <th colSpan={4}>Lower Limits</th>
                    </tr>
                    <tr>
                        <th>Program Manager</th>
                        <th>Group ID</th>
                        <th>Group Name</th>
                        <th>Limit</th>
                    </tr>
                </thead>
                <tbody>
                    {cmgLimits.slice(0,4).map((item) => {
                        return(
                            <>
                                <tr>
                                    <td>{item.pm}</td>
                                    <td>{item.gid}</td>
                                    <td>{item.gname}</td>
                                    <td>{item.lowerlimit}</td>
                                </tr>
                            </>
                        )
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={4}><button>save</button></td>
                    </tr>
                </tfoot>
            </table>
        </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerManagement
