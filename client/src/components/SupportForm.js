import React, { useState } from 'react';
import 'firebase/auth';
import axios from 'axios';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseApp from './InitFirebase.js';
import { useNavigate } from 'react-router-dom';



function SupportForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [title,setTitle] = useState('');
    const [context,setContext] = useState('');
    
    const handleSupport=async()=>{
        
        const data = {
            name: name,
            email: email,
            title:title,
            context: context,
    
        }
        await axios.post('/api/support-data', data)
        .then(response => {
            console.log('Created document with ID:', response.data.id);
        })
        .catch(error => {
            console.error(error);
        });
        
    }  

    return (
      <form onSubmit={handleSupport}>
      <h2>Support</h2>
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
        <label>name:</label>
        <input
          type="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>title:</label>
        <input
          type="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>context:</label>
        <input
          type="context"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          required
        />
      </div>
      {/* <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div> */}
      <button type="submit">submit form</button>
    </form>
    );
  }

export default SupportForm;