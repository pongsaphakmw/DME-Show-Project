import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import'./Footer.css';

function Footer() {
  return (
    <Navbar bg="dark" variant="dark" expand="sm">
      <Navbar.Brand href="/">My App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto footer_item">
          <Nav.Link href="./#about">About</Nav.Link>
          <Nav.Link href="/support">Support</Nav.Link>
          <Nav.Link href="/contributor">Contributor</Nav.Link>
          <Nav.Link href="/term-policy">Term & Policy</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Footer;
