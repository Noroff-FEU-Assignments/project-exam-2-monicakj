import React from 'react';
import LogoutButton from "../common/LogoutButton";
import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';

function SubNav() {
  return (
    <Container>
    <div className='sub__nav'>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/my-profile">My Profile</NavLink>
      <NavLink to="/profiles">Find Friends</NavLink>
      <LogoutButton />
    </div>
    </Container>
  )
}

export default SubNav;