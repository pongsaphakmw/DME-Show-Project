import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar, Nav } from 'react-bootstrap';
import './NavBarLandingPage.css';
import Button from 'react-bootstrap/Button';
import logo from './image/DMELOGO.svg';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {BsFillPeopleFill} from "react-icons/bs";
import Badge from 'react-bootstrap/Badge';
import{AiFillGoogleCircle} from "react-icons/ai";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
function Navigation() {
const [expand, setExpand] = useState('sm');

let handleExpand2 = expand;
if (expand){
  handleExpand2 =<div className='line_nav'></div>;
  
}
return (
  <div> 
  <Navbar expand={expand} className="mb-3">
    
    <Container fluid>
      <Navbar.Brand href="/"> <img src={logo} alt=''/></Navbar.Brand>
      <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand} ` } />
        <Navbar.Collapse id="basic-navbar-nav">
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
            
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} href="/home">
                    DME SHOW CASE
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3 ">
                  <Nav.Link href="#action1"> 
                  <BsFillPeopleFill className='incon_people'/>
                  </Nav.Link >
                  
                  {handleExpand2}
                  
                  <Button  className='button ' variant="outline-dark" href="/sign-in">sign in</Button>
                  <br/>
                  
                  <Button className='button_signup' variant="outline-danger" href="/sign-up">sign up</Button>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Navbar.Collapse>
      </Container>
    </Navbar>
  </div>
  );
}

export default Navigation;
