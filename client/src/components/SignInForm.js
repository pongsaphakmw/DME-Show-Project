import React, { useState } from 'react';
import 'firebase/auth';
import axios from 'axios';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseApp from './InitFirebase.js';
import { useNavigate } from 'react-router-dom';

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const checkUserResponse = await axios.post('/api/auth/check-user', { email });
      const userExists = checkUserResponse.data;

      if (!userExists) {
        alert('User does not exist');
        return;
      }

      try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const { user } = userCredential;

        const csrfTokenResponse = await axios.get('/api/auth/csrf-token');
        const csrfToken = csrfTokenResponse.data.csrfToken;

        const response = await axios.post(
          '/api/auth/sign-in',
          { user },
          {
            headers: {
              'X-CSRF-Token': csrfToken
            }
          }
        );


        if (response && response.data) {
          const { cookies } = response.data;
          // sessionStorage.setItem('token', cookies.session);
          navigate('/home', { token: cookies.session });
        } else {
          throw new Error('Invalid response or missing data');
        }
      } catch (error) {
        console.error(error);
        alert('User or password is not correct');
      }

      // Clear the form
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error(error);
      alert('Sign in failed');
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

export default SignInForm;
