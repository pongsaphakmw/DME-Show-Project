import React, { useState } from 'react';
import 'firebase/auth';
import Navigation from './NavBar';
import './SignInAndSignUpPage.css'
import SignInForm from './SignInForm';
import Button from 'react-bootstrap/Button';


function SignInPageApp(){
    return (
        <div className='Page_Signin'>
            <Navigation />
            <h1 className='title text-center'>Welcome to community
                
            </h1>
            <p className='container'>
            
                <SignInForm />
                <h2 className='PositinFooterText text-center'>Don’t have an account?  
                <Button className='textbutton ' variant='link' style={{ textDecoration: 'none' }}>
                Join Now
                </Button>
            </h2>
            </p>
        </div>
    );
}

export default SignInPageApp;