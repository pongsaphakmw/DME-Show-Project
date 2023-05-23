import './App.css';
import React, { useState, useEffect } from 'react';
import Navigation from './components/NavBar.js';
import SignInForm from './components/SignInForm.js';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

function LandingPageApp(){

    return (
        <div>
            <Navigation />
            <div className="landingPage">
                <h1>Welcome to the Landing Page</h1>
            </div>
            <SignInForm />
        </div>
    )
}

export default LandingPageApp;
