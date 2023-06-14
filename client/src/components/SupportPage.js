import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import 'firebase/auth';
import Navigation from './NavBar';
import './SignInAndSignUpPage.css'
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