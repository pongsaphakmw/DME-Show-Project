import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './NavBarLandingPage.css';
import Button from 'react-bootstrap/Button';
import logo from './image/DMELOGO.svg';

import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {BsFillPeopleFill} from "react-icons/bs";
import {BsBell} from "react-icons/bs";
import {BsFillChatFill} from "react-icons/bs";
import { getAuth } from 'firebase/auth';
import {BsFillGridFill} from "react-icons/bs";
import {BsBriefcase} from "react-icons/bs";

import Form from 'react-bootstrap/Form';



function Navigation() {
  const [expand, setExpand] = useState('sm');
  const auth = getAuth();
  const user = auth.currentUser;

  const handleSignOut = () => {
    auth.signOut();
  }

let handleExpand2 = expand;
if (expand){
  handleExpand2 =<div className='line_nav'></div>;
  
}
return (
  <div> 
  <Navbar expand={expand}>
    
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
               
                  {user === null ? (
                      <div className="nav-icons">
                           <Nav.Link href="/"> 
                          <BsFillPeopleFill className='incon_people'/>
                          </Nav.Link >
                          {handleExpand2}
                        <Button  className='button' variant="outline-dark" href="/sign-in">sign in</Button>
                        
                        <Button className='button_signup' variant="outline-danger" href="/sign-up">sign up</Button>
                      </div>
                    ) : (
                    <div className="nav-icons">
                           <Form className=" form_align d-flex align-items-center"> 
                        <Form.Control
                          type="search"
                          placeholder="Search"
                          className="me-2"
                          aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                      </Form>
                      <Nav.Link href="/">
                        <BsFillChatFill className="incon_people" />
                      </Nav.Link>
                      <Nav.Link href="/">
                        <BsBell className="incon_people" />
                      </Nav.Link>
                      <Nav.Link href="/">
                        <BsBriefcase className="incon_people" />
                      </Nav.Link>
                      <Nav.Link href="/">
                        <BsFillGridFill className="incon_people" />
                      </Nav.Link>
                        <Button className='button ' variant="outline-dark" href="/" onClick={handleSignOut}>sign out</Button>
                      </div>
                    )}
                    
                  
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
