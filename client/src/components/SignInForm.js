import React, { useState, useEffect } from 'react';
import 'firebase/auth';
import axios from 'axios';
import { getAuth, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import firebaseApp from './InitFirebase.js';
import { useNavigate } from 'react-router-dom';
import{AiFillGoogleCircle} from "react-icons/ai";
import '../LandingPage.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { GoogleAuthProvider } from 'firebase/auth';


function SignInForm() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    // Fetch the CSRF token from the server
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('/api/auth/csrf-token');
        const { csrfToken } = response.data;
        console.log('csrfToken', csrfToken);
        // console.log('response', response);
        setCsrfToken(csrfToken);
      } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
      }
    };

    fetchCsrfToken();
  }, []);

  const handleSignInWithGoogle = async (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      const user = result.user;
      const idToken = credential.idToken;
      // console.log('user', user);
      // console.log('idToken', idToken);
      // console.log('credential', credential);
      if (user !== null) {
        const fetchFirebaseResponse = axios.post('/api/auth/sign-up-with-google', { user },)
        .then((response) => {
          console.log('response', response);
          navigate('/home', { state: { token: idToken } });
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
  }

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const checkUserResponse = await axios.post('/api/auth/check-user', { email });
      const userExists = checkUserResponse.data;

      if (!userExists) {
        alert('User does not exist');
        return;
      }
        
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredential.user.getIdToken();
        const { user } = userCredential;

        if (!userCredential) {
          throw new Error('Password is incorrect');
        }

        
        if (csrfToken !== undefined) {
          try {
          const cookieResponse = await axios.post('/api/auth/sign-in', { user, idToken },
          { headers: {'X-CSRF-Token': csrfToken}})
            
          navigate('/home', { state: { token: idToken } });
        } catch (error) {
          console.error(error);
        }
        } else {
          throw new Error('CSRF token is undefined');
        }
        
        

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
        <Form.Label className="textbox">Email or Phone</Form.Label>
        <Form.Control 
                      className="box_sizing"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className="textbox">Password</Form.Label>
        <Form.Control 
                        type="password" 
                        className="box_sizing" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required/>
        <Form.Text className="textforgotpassword">Forgot your password?</Form.Text>
      </Form.Group>
      <Button className="box_signin mb-5" variant="danger" type="submit">
        Sign In
      </Button>
      <div className="layout_lineror">
        <a className="liner_or"></a>
        or
        <a className="liner_or"></a>
      </div>
      <Button className="box_signin_google mb-3 mt-5 "  variant="outline-dark" type="submit" onClick={handleSignInWithGoogle}>

        <AiFillGoogleCircle  className='incon_people me-2' />
        sign in with google
      </Button>
      <Button className="box_signin_google"  variant="outline-dark" type="submit">
        Sign Up
      </Button>
    </Form>

  </div>
  );
}

export default SignInForm;
