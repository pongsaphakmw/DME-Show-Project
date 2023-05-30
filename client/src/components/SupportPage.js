import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar, Nav } from 'react-bootstrap';
import Footter from './Footter';
import 'firebase/auth';
import Navigation from './NavBar';
import './SignInAndSignUpPage.css'
import SupportForm from './SupportForm';

function Support() {
    return (
        <div>
            <Navigation/>
            <SupportForm/>
            <Footter/>
        </div>
        
    );
  }
  
  export default Support;