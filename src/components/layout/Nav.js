import React from 'react';
import { NavbarBrand } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import Logo from "../../assets/SoMe-logo.svg";

function Nav () {
  return (
      <Navbar bg="black" variant="dark" expand="lg">
        <NavLink to="/">
          <NavbarBrand>
            <img src={Logo} alt="brand logo"></img>
          </NavbarBrand>
        </NavLink>
      </Navbar>
  );
}

export default Nav;