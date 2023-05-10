import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar, Nav } from 'react-bootstrap';

function Navigation() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">My App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/sign-up">Sign Up</Nav.Link>
          <Nav.Link href="/sign-in">Sign In</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
