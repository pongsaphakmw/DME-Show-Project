import React, { useState } from 'react';
import 'firebase/auth';
import Navigation from './NavBar';
import SignInForm from './SignInForm';

function SignInPageApp(){
    return (
        <div>
            <Navigation />
            <SignInForm />
        </div>
    )
}

export default SignInPageApp;