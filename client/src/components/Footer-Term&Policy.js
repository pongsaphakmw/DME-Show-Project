import LandingPageApp from "../LandingPage";
import App from "../App";
import { Switch, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar, Nav, Container } from 'react-bootstrap';




function TermPolicy() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/support">Support</Nav.Link>
            <Nav.Link href="/sign-up">Sign up</Nav.Link>
            <Nav.Link href="/contributor">Contributor</Nav.Link>
            <Nav.Link href="/term-policy">Term & Policy</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
}

   
export default TermPolicy;
