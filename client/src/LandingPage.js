import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from './NavBar.js';

function LandingPageApp(){
    return (
        <div>
            <Navigation />
            <div className="landingPage">
                <h1>Welcome to the Landing Page</h1>
            </div>
        </div>
    )
}

export default LandingPageApp;
