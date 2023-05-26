import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Footer(){
    return (
        <footer className="footer">
            <div className="container">
                <span className="text-muted">Place sticky footer content here.</span>
            </div>
        </footer>
    )
}

export default Footer;