import './App.css';
import React, { useState, useEffect } from 'react';
import Navigation from './components/NavBar.js';
import Footerapp from './components/Footer-cotrubuter';
import axios from 'axios';
import './LandingPage.css';
import SignInForm from './components/SignInForm.js';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import SignUpForm from './components/SignUpPage.js';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {BsFillPeopleFill} from "react-icons/bs";
import Badge from 'react-bootstrap/Badge';
import{AiFillGoogleCircle} from "react-icons/ai";

function LandingPageApp() {
  const [expand, setExpand] = useState('sm');

  let handleExpand2 = expand;
  if (expand){
    handleExpand2 =<div className='line_nav'></div>;
   
  }


  return (
    <div> 
      <Navbar expand={expand} className="mb-3">
        <Container fluid>
          <Navbar.Brand href="#">DME SHOW CASE</Navbar.Brand>
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
                      <Nav className='mb-1'></Nav>
                      <Button className='button_signup' variant="outline-danger" href="/sign-up">sign up</Button>
                    </Nav>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Navbar.Collapse>
          </Container>
        
      </Navbar>
      
      <div className="Boxuser_password">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="textbox">Email or Phone</Form.Label>
            <Form.Control className="box_sizing" type="email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="textbox">Password</Form.Label>
            <Form.Control type="password" className="box_sizing" />
            <Form.Text className="textforgotpassword">Forgot your password?</Form.Text>
          </Form.Group>
          <Button className="box_signin mb-5" variant="danger" type="submit">
            Sign In
          </Button>
          <div className="layout_lineror">
            <a className="liner_or"></a>
            or
            <a className="liner_or"></a>
          </div>
            <Footerapp/>          <Button className="box_signin_google mb-3 mt-5 "  variant="outline-dark" type="submit">
           
            <AiFillGoogleCircle  className='incon_people me-2' />
            sign in with google
          </Button>
          <Button className="box_signin_google"  variant="outline-dark" type="submit" >
            Sign Out
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default LandingPageApp;