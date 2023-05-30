import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar, Nav } from 'react-bootstrap';
import Footer from './Footer';

function Contributor() {
    return (
        <div>
            <p>Contributor</p>
            <Footer/>
        </div>
    );
  }
  
  export default Contributor;