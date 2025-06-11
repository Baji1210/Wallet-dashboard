import React from 'react'
import './NoKycWalletTagUpperLimits.css'

const NoKycWalletTagUpperLimits = ({ walletTagNoKycLimits,setViewAll}) => {
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
                <tr><th colSpan={5}>Upper Limits</th></tr>
                <tr>
                 <th>Program Manager</th>
                  <th>Group ID</th>
                  <th>Group Name</th>
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
                {walletTagNoKycLimits.map((item, index) => (
                  <tr key={index || item.id}>
                    <td>{item.pm}</td>
                    <td>{item.gid}</td>
                    <td>{item.gname}</td>
                    <td>{item.UpperLimits}</td>
                    <td><img style={{cursor:'pointer'}} src="/assets/main/edit.png" alt="" /></td>
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
                    <button>save</button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoKycWalletTagUpperLimits

