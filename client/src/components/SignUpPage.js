import React, { useState } from 'react';
import 'firebase/auth';
import Navigation from './NavBar';
import SignUpForm from './SignUpForm';


function SignUpPageApp(){
    return (
        <div>
            <Navigation />
            <SignUpForm />
        </div>
    )
}

export default SignUpPageApp;