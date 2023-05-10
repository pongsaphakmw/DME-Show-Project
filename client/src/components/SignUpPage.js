import React, { useState } from 'react';
import 'firebase/auth';
import axios from 'axios';
import Navigation from './NavBar';

function SignUpForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
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
      <button type="submit">Sign Up</button>
    </form>
    );
  }


function SignUpPageApp(){
    return (
        <div>
            <Navigation />
            <SignUpForm />
        </div>
    )
}

export default SignUpPageApp;