import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar, Nav } from 'react-bootstrap';
import Footter from './Footter';

function Contributor() {
    return (
        <div>
            <p>Contributor</p>
            <Footter/>
        </div>
    );
  }
  
  export default Contributor;