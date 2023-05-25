import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar, Nav } from 'react-bootstrap';
import Footter from './Footter';

function Support() {
    return (
        <div>
            <p>Support</p>
            <Footter/>
        </div>
        
    );
  }
  
  export default Support;