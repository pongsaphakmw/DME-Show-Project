import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar, Nav } from 'react-bootstrap';
import Footer from './Footer';
import 'firebase/auth';
import Navigation from './NavBar';
import '../LandingPage.css';
import './SignInPage.css'
import SupportForm from './SupportForm';

function Support() {
    return (
        <div>
            <Navigation/>
            <SupportForm/>
            <Footer/>
        </div>
        
    );
  }
  
  export default Support;