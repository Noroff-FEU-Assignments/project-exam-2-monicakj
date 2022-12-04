import React from 'react';
// import HomeCarousel from './HomeCarousel';
import HomeCta from './HomeCta';
import { Link } from 'react-router-dom';
// import HeroImage from "../../assets/SoMe.svg";

function Index () {
  document.title = "Social Media Company | Home";

  return (
    <>
    <div className="sub__nav">
      <Link to="/login">Login</Link>|<Link to="/register">Register</Link>
    </div>

    <div className='index--hero'>
        {/* <HomeCarousel /> */}
          {/* <img src={HeroImage} alt="soMe hero"></img> */}
    </div>
    
    <HomeCta />
    </>
  );
}

export default Index;
