import React, { useState } from 'react';
import 'firebase/auth';
import Navigation from './NavBar';
import SignInForm from './SignInForm';

import '../LandingPage.css';
import './SignInPage.css'
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



function SignInForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSignIn = async (e) => {
       e.preventDefault();

    try {
      // Make a POST request to the sign-up endpoint of your Express.js backend
      const response = await axios.post('/api/auth/sign-in', { email, password });
      const token = response.data.token;
      console.log(token); // User created successfully
      // Clear the form
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error(error.response.data);
    }
  };

    return (
      <form onSubmit={handleSignIn}>
      <h2>Sign In</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Sign In</button>
    </form>
    );
  }

function SignInPageApp(){
    return (
        <div  >
            <Navigation />
     
          
            <SignInForm />
        </div>
    );
}

export default SignInPageApp;