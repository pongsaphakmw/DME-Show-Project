import React, { useState } from 'react';
import 'firebase/auth';
import axios from 'axios';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseApp from './InitFirebase.js';
import { useNavigate } from 'react-router-dom';
// import TermsAndPolicies from './AcceptPolicy';
function SignUpForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
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
      <form onSubmit={handleSignUp}>
      <h2>Sign Up</h2>
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
      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
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
    </form>
    );
  }

export default SignUpForm;