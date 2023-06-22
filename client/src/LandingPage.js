import './App.css';
import React, { useState, useEffect } from 'react';
import Navigation from './components/NavBar.js';
import SignInForm from './components/SignInForm.js';
import './LandingPage.css';
import Button from 'react-bootstrap/Button';
import Footer from './components/Footer';
import poster1 from './components/image/poster_landingpage_1.svg';
import poster2 from './components/image/poster_landingpage_2.svg';
import poster3 from './components/image/poster_landingpage_3.svg';
import Container from 'react-bootstrap/Container';


function LandingPageApp() {


  return (
    <div className='background_landingpage'>
       
      
      <Navigation />
    
    <div className='PositionComponent'>
      <h1 className='title1'>Welcome</h1>
      <h2 className='title2'>to Digital Media  Engineering Community</h2>
      <SignInForm />
      <div className='positionbutton'>
      <Button className="box_signup_google"  variant="outline-dark" href="/sign-up" >
        Sign Up 
      </Button>
      </div>
      </div>
          <img src={poster2} alt='' className ='poster2'/>
          <img src={poster1} alt='' className ='poster1'/>
        <div id="about" className='magin_about' >
          <p1 className='about_text1 '>"The place that DME students can show their skills also it can be their portfolio. " </p1>
          <p2 className='about_text2'>"DME students can make money from their product or their service that display on this website." </p2>
          <img src={poster3} alt='' className ='poster3'/>
        </div>
        <Footer/>
       
    </div>
  );
}

export default LandingPageApp;