// import React, { useState } from 'react'
import {bodyData} from './BodyData'
import './BodySection.css'
const BodySection = () => {
    // const [openIndex,setOpenIndex] = useState(null)
  return (
    <div className='bodysections'>
      <ul className='outerlist'>
        {bodyData.map((item,index)=>{
            return(
                <li key={index} className='outercontent'>
                    <img src={item.image} alt={item.title} />
                    <h1>{item.title}</h1>
                    <img src="/assets/sidebar/Vector.png" alt="Vector" />
                </li>
            )
        })}
      </ul> 
    </div>
  )
}

export default BodySection
