import React, { useState } from 'react';
import 'firebase/auth';
import axios from 'axios';
import { getAuth, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
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
      
    const handleSignUp = async (e) => {
       e.preventDefault();

    if (password !== confirmPassword) {
        alert("Passwords don't match");
        return;
    }

    try {
      const checkUserResponse = await axios.post('/api/auth/check-user', { email });
      const  userExists  = checkUserResponse.data;

      if (userExists) {
        alert('User already exists');
        return;
      }
      
      const response = await axios.post('/api/auth/sign-up', { email, password });
      console.log(response.data); // User created successfully

      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const idToken = await userCredential.user.getIdToken();

      // Navigate to the home page and store the user's ID and refresh token in local storage
      
      navigate('/home', { state: { token: idToken } });

      // Clear the form
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error(error);
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

          <Form.Group className="mb-3" controlId="formBasicCheckbox" style={{ display: 'inline-flex', alignItems: 'center' }}>
          <Form.Check type="checkbox" label="I agree to the" onChange={handleAgreementChange} checked={agreed} style={{ marginRight: '5px' }} />
            <a href="/term-policy" className="term_policy" target="_blank" style={{ display: 'inline-block' }}>Terms of Service and Privacy Policy</a>
          </Form.Group>


          <Button className="box_signin mb-3" variant="danger" type="submit" disabled={!agreed}>
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
        </Form>
      </div>
    );
  }

export default SignUpForm;