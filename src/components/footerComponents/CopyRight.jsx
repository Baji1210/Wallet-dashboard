import React from 'react'
import './CopyRight.css'
const CopyRight = () => {
    const date = new Date()
  return (
    <div className='copyright'>
      <h1>@{date.getFullYear()} Integra Micro Systems Pvt.Ltd</h1>
    </div>
  )
}

export default CopyRight