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
                {data.length === 0 ? (
                    <p>No data to display</p>
                ) : (
                    <ul>
                    {data.map((item) => (
                        <li key={item.id}>{item.name} {item.email}</li>
                    ))}
                    </ul>
                )}

            </header>
        </div>
    );
                    }

export default Home;