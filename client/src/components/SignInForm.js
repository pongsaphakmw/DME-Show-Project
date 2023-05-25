import React, { useState, useEffect } from 'react';
import 'firebase/auth';
import axios from 'axios';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseApp from './InitFirebase.js';
import { useNavigate } from 'react-router-dom';
import{AiFillGoogleCircle} from "react-icons/ai";
import './SignInForm.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const navigate = useNavigate();

  // useEffect(() => {
    // Fetch the CSRF token from the server
  //   const fetchCsrfToken = async () => {
  //     try {
  //       const response = await axios.get('/api/auth/csrf-token');
  //       const { csrfToken } = response.data;
  //       setCsrfToken(csrfToken);
  //     } catch (error) {
  //       console.error('Failed to fetch CSRF token:', error);
  //     }
  //   };

  //   fetchCsrfToken();
  // }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();


    try {
      const checkUserResponse = await axios.post('/api/auth/check-user', { email });
      const userExists = checkUserResponse.data;

      if (!userExists) {
        alert('User does not exist');
        return;
      }
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const { user } = userCredential;

        // const csrfTokenResponse = await axios.get('/api/auth/csrf-token');
        // const csrfToken = csrfTokenResponse.data.csrfToken;
        // console.log(csrfToken);

        // const response = await axios.post(
        //   '/api/auth/sign-in',
        //   { user },
        //   {
        //     headers: {
        //       'X-CSRF-Token': csrfToken
        //     }
        //   }
        // );

        if (!userCredential) {
          throw new Error('Password is incorrect');
        }

        // if (response && response.data) {
        //   const { cookies } = response.data;
        //   // sessionStorage.setItem('token', cookies.session);
        //   navigate('/home', { token: cookies.session });
        // } else {
        //   throw new Error('Invalid response or missing data');
        // }

        if (csrfToken !== undefined) {
          navigate('/home', { token: csrfToken });
        } else {
          throw new Error('Invalid response or missing data');
        }

      // Clear the form
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error(error);
      alert('Sign in failed' + error.message);
    }
  };

  return (
    
  <div className="Boxuser_password">
    <Form onSubmit={handleSignIn}>
    <input type="hidden" name="_csrf" value={csrfToken} />
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="textbox">Email</Form.Label>
        <Form.Control 
                      className="box_sizing"      
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required />
      </Form.Group>

      <Form.Group className="mb-5" controlId="formBasicPassword">
        <Form.Label className="textbox">Password</Form.Label>
        <Form.Control 
                        type="password" 
                        className="box_sizing" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required/>
      <Form.Text className="textforgotpassword">forgot your password?</Form.Text>
      </Form.Group>
      <Button className="box_signin mb-3" variant="danger" type="submit">
        Sign In
      </Button>
          <div className="layout_lineror">
            <a className="liner_or"></a>
            or
            <a className="liner_or"></a>
          </div>
      <Button className="box_signin_google mt-3 mb-3"  variant="outline-dark" type="submit">
        
        <AiFillGoogleCircle  className='incon_people me-2' />
        Sign in with google
      </Button>
    </Form>
    
  </div>
   
    
  );
}

export default SignInForm;
