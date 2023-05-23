import React, { useState, useEffect } from 'react';
import 'firebase/auth';
import axios from 'axios';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseApp from './InitFirebase.js';
import { useNavigate } from 'react-router-dom';

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the CSRF token from the server
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('/api/auth/csrf-token');
        const { csrfToken } = response.data;
        setCsrfToken(csrfToken);
      } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
      }
    };

    fetchCsrfToken();
  }, []);

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
    <form onSubmit={handleSignIn}>
      <input type="hidden" name="_csrf" value={csrfToken} />
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

export default SignInForm;
