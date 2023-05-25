import React, { useState } from 'react';
import 'firebase/auth';
import axios from 'axios';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseApp from './InitFirebase.js';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import{AiFillGoogleCircle} from "react-icons/ai";
function SignUpForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSignUp = async (e) => {
       e.preventDefault();

    if (password !== confirmPassword) {
        alert("Passwords don't match");
        return;
    }

    try {
      // Make a POST request to the sign-up endpoint of your Express.js backend
      const checkUserResponse = await axios.post('/api/auth/check-user', { email });
      const  userExists  = checkUserResponse.data;

      if (userExists) {
        alert('User already exists');
        return;
      }
      
      const response = await axios.post('/api/auth/sign-up', { email, password });
      console.log(response.data); // User created successfully

      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password)
      if (response && response.data) {
        const { token } = response.data;
        navigate('/home', { token: token });
      } else {
        throw new Error('Invalid response or missing data');
      }

      // Clear the form
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error(error.response.data);
    }
  };
  
    return (

      <div className="Boxuser_password">
        <Form  onSubmit={handleSignUp}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="textbox">Email</Form.Label>
            <Form.Control className="box_sizing"
                           type="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           required/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="textbox">Password (8+ characters)</Form.Label>
            <Form.Control  className="box_sizing" 
                             type="password"
                             value={password}
                             onChange={(e) => setPassword(e.target.value)}
                             required/>   
          </Form.Group>

          <Form.Group className="mb-5" controlId="formBasicPassword">
            <Form.Label className="textbox">Confirm Password (8+ characters)</Form.Label>
            <Form.Control  className="box_sizing" 
                               type="password"
                               value={confirmPassword}
                               onChange={(e) => setConfirmPassword(e.target.value)}
                               required/>
          </Form.Group>

          <Button className="box_signin mb-3" variant="danger" type="submit">
          Agree
          </Button>
          <div className="layout_lineror">
            <a className="liner_or"></a>
            or
            <a className="liner_or"></a>
          </div>
                 
          <Button className="box_signin_google mb-3 mt-3 "  variant="outline-dark" type="submit">
           
            <AiFillGoogleCircle  className='incon_people me-2' />
            Sign in with google
          </Button>
        </Form>
      </div>
   

    
    );
  }

export default SignUpForm;