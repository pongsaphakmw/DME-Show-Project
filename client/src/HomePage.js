import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
    const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/test-data')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []);
    return (
        <div className="App">
            <header className="App-header">
                <h1>Home</h1>
                <p>
                    {data.map(item => (
                        <div key={item.id}>
                            <h2>{item.title}</h2>
                            <p>{item.body}</p>
                        </div>
                    ))}
                </p>
            </header>
        </div>
    );
                    }

export default Home;