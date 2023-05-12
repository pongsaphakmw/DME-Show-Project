import './App.css';
import React, { useState, useEffect } from 'react';
import Navigation from './components/NavBar.js';
import axios from 'axios';
import './LandingPage.css';
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
  const handleExpand = () => {
    setExpand('sm');
  };

  return (
    <div> 
      <Navbar bg="light" expand={expand} className="mb-3">
        <Container fluid>
          <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="#action1"> 
                 <BsFillPeopleFill className='incon_people'/>
                </Nav.Link >
                <div className='line_nav'></div>
                <Button  className='button' variant="outline-success me-2" >sign in</Button>
                <Button className='button' variant="outline-success">sing up</Button>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <h1 className="title">Welcome</h1>
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
          <Button className="box_signin mb-5" variant="primary" type="submit">
            Sign In
          </Button>
          <div className="layout_lineror">
            <a className="liner_or"></a>
            or
            <a className="liner_or"></a>
          </div>
          
          <Button className="box_signin mb-3 mt-5 " variant="primary" type="submit">
           
            <AiFillGoogleCircle  className='incon_people'/>
            sign in with google
          </Button>
          <Button className="box_signin" variant="primary" type="submit">
            Sign In
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default LandingPageApp;