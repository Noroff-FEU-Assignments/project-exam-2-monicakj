import React from 'react';
import Heading from '../layout/Heading';
import SubNav from "../layout/SubNav";
import AuthContext from '../../context/AuthContext';
import { useContext } from "react";
import { Container } from 'react-bootstrap';
import { MdOutlineWavingHand } from "react-icons/md";

function Dashboard() {
  const [auth] = useContext(AuthContext);

  document.title = "Social Media Company | Dashboard";

  
  return (
    <>
    <SubNav />

    <Container>
    <div className='dashboard__container'>
      <Heading title="Dashboard"></Heading>
    <div className='dashboard__content'>
      <h4 className='subHeading'>Welcome back, {auth.name} <MdOutlineWavingHand /></h4>
      </div>
    </div>
    </Container>
    </>
  )
}

export default Dashboard;