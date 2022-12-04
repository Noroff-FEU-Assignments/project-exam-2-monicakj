import React from 'react';
import HomeCta from './HomeCta';
import { Link } from 'react-router-dom';
// import HeroImage from "../../assets/SoMe-hero.svg";

function Index () {
  document.title = "Social Media Company | Home";

  return (
    <>
    <div className="sub__nav">
      <Link to="/login">Login</Link>|<Link to="/register">Register</Link>
    </div>

    <div className='index--hero'>
          {/* <img src={HeroImage} alt="soMe hero"></img> */}
    </div>
    
    <HomeCta />
    </>
  );
}

export default Index;
