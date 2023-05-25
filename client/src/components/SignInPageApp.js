import React, { useState } from 'react';
import 'firebase/auth';
import Navigation from './NavBar';
import SignInForm from './SignInForm';
import './SignInAndSignUpPage.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import SignUpForm from '../components/SignUpPage.js';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {BsFillPeopleFill} from "react-icons/bs";
import Badge from 'react-bootstrap/Badge';
import{AiFillGoogleCircle} from "react-icons/ai";

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