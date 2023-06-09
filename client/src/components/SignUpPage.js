import React, { useState } from 'react';
import 'firebase/auth';
import Navigation from './NavBar';
import SignUpForm from './SignUpForm';
import TermsAndPolicies from './AcceptPolicy';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
function SignUpPageApp(){
    const navigate = useNavigate();
    const signIn = async () => {
        navigate('/sign-in');
    };
    return (
        <div className='Page_Signin'>
            <Navigation />
            <h1 className='title text-center'>Join to our community</h1>
            <p className='container'>
            <SignUpForm />
            <h2 className='PositinFooterText text-center'>Already have an account  
                <Button className='textbutton ' variant='link' style={{ textDecoration: 'none' }} onClick={signIn}>
                Sign in
                </Button>
            </h2>
            
            </p>
        </div>
    )
}

export default SignUpPageApp;