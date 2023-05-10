import './App.css';
import React, { useState, useEffect } from 'react';
import Navigation from './components/NavBar.js';
import axios from 'axios';
import Navigation from './NavBar.js';
import './LandingPage.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


function LandingPageApp() {
    return (
      <div>
          <Navbar className ="navbar" bg="light" expand="lg">
            <Navbar.Brand href="#">My Website</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="#">Home</Nav.Link>
                    <Nav.Link href="#">About</Nav.Link>
                    <Nav.Link href="#">Contact</Nav.Link>
                    </Nav>
            </Navbar.Collapse>
        </Navbar>
        <h1 className="title">
            Welcome
        </h1>
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
  
            <Button className ="box_signin" variant="primary" type="submit">
              Sign In
            </Button>
            <Button className ="box_sigout" variant="primary" type="submit">
              Sign In
            </Button>
            <Button className ="box_sigout" variant="primary" type="submit">
              Sign In
            </Button>




          </Form>
        </div>
      </div>
    );
}

export default LandingPageApp;
