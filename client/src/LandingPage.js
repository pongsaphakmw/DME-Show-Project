import './App.css';
import React, { useState, useEffect } from 'react';
import Navigation from './components/NavBar.js';
import Footerapp from './components/Footer-cotrubuter';

function LandingPageApp(){
    return (
        <div>
            <Navigation />
            <div className="landingPage">
                <h1>Welcome to the Landing Page</h1>
            </div>
            <Footerapp/>
        </div>
    )
}

export default LandingPageApp;
