import React from 'react';
import { NavbarBrand } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

function Nav () {
  return (
      <Navbar bg="black" variant="dark" expand="lg">
        <NavLink to="/">
          <NavbarBrand>SoMe</NavbarBrand>
        </NavLink>
      </Navbar>
  );
}

export default Nav;