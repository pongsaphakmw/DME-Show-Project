import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from './Footer';

function TermPolicy() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/api/term-policy')
        .then((res) => res.json())
        .then((data) => setData(data));
    }, []);

   console.log('data', data);
    return (
        <div>
            <p>Term & Policy</p>
            <div>
                {data.length === 0 ? (
                    <p>No data to display</p>
                    ) : (
                        <p>
                            {data.map((item) => (
                                <p>{item.terms}</p>)
                                )}
                        </p>
                    )}
            </div>
            <Footer/>
        </div>
    );
  }
  
  export default TermPolicy;