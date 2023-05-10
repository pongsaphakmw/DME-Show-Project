import React, { useState } from 'react';
import 'firebase/auth';
import axios from 'axios';
import Navigation from './NavBar';

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
        <div>
            <Navigation />
            <SignInForm />
        </div>
    )
}

export default SignInPageApp;