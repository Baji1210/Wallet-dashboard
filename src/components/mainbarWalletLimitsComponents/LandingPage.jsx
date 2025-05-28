import React from 'react'
import './LandingPage.css'
const LandingPage = () => {
  return (
    <div className='landingpage'>
      <div className="landingsec">
        <div className="head">
          <h1>Integra Wallet</h1>
        </div>
        <div className="cont-image">
          <div className="cont">
            <h1>Welcome to Integra wallet</h1>    
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis voluptate nobis animi non reiciendis repellendus dolorem expedita, harum est quam consectetur laborum fugit reprehenderit sed officiis aut? Tempora, non veritatis!</p>      
          </div>
          <div className="image">
            <img src="/assets/main/landingpage.png" alt="landingpage" />
          </div>    
        </div>
      </div>
    </div>
  )
}

export default LandingPage
