import React, { useState } from 'react';
import 'firebase/auth';
import axios from 'axios';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import firebaseApp from './InitFirebase.js';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { GoogleAuthProvider } from 'firebase/auth';

import{AiFillGoogleCircle} from "react-icons/ai";
function SignUpForm() {
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const [agreed, setAgreed] = useState(false);
  
    const handleAgreementChange = (event) => {
      setAgreed(event.target.checked);
    };

    const atIndex = email.indexOf('@');
    const name = email;
    if (atIndex !== -1) {
      name = email.substring(0, atIndex);
    }
      
      
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
      
      const response = await axios.post('/api/auth/sign-up', {name, email, password });
      console.log(response.data); // User created successfully

      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const idToken = await userCredential.user.getIdToken();

      // Navigate to the home page and store the user's ID and refresh token in local storage
      navigate('/home', { state: { token: idToken } });

      // Clear the form
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleSignInWithGoogle = async (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      const user = result.user;
      // navigate('/term-policy', { state: { userCredential: result } });
      if (user !== null) {
        const fetchFirebaseResponse = axios.post('/api/auth/sign-in-with-google', { user },)
        .then(async (response) => {
          // const userCredential = signInWithCredential(auth, credential);
          const userCredential = getAuth().currentUser;
          const idToken = userCredential.getIdToken().then((idToken) => {
            navigate('/home', { state: { token: idToken } });
          }).catch((error) => {
            console.error(error);
          });
        }
        ).catch((error) => {
          console.error(error);
        });
      }
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
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
          Sign Up
          </Button>
          <div className="layout_lineror">
            <a className="liner_or"></a>
            or
            <a className="liner_or"></a>
          </div>
                 
          <Button className="box_signin_google mb-3 mt-3 "  variant="outline-dark" type="submit" onClick={handleSignInWithGoogle}>
           
            <AiFillGoogleCircle  className='incon_people me-2' />
            Sign in with google
          </Button>
        <div>
            <label>
              <input
                type="checkbox"
                checked={agreed}
                onChange={handleAgreementChange}
              />
              I agree to the terms and policies.
            </label>
          </div>
        <button type="submit" disabled={!agreed} >Sign Up</button>
        </Form>
      </div>
    );
  }

export default SignUpForm;