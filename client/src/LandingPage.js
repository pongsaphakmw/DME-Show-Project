import './App.css';
import React, { useState, useEffect } from 'react';
import Navigation from './components/NavBar.js';
import SignInForm from './components/SignInForm.js';
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
import Footer from './components/Footer';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


function LandingPageApp() {


  return (
    <div> 
      <Navigation />
    <div className='PositionComponent'>
      <SignInForm />
     
      <div className='positionbutton'>
      <Button className="box_signup_google"  variant="outline-dark" href="/sign-up" >
        Sign Up
      </Button>
      </div>
      <div id="about" className='magin_about' >
        <p>"about The place that DME students can show their skills also it can be their portfolio. 
DME students can make money from their product or their service that display on this website." </p>
      </div>

      
      <Footer/>
    </div>
    </div>
  );
}

export default LandingPageApp;