import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MyButton() {
  const data = {
    name: 'MockUpName2',
    email: 'MockUpEmail2',
    registerDate: 'MockUpRegisterDate2',
    profileIMG: 'MockUpProfileIMG2',
    detail: 'MockUpDetail2',
  }
  axios.post('/api/post-data', data)
  .then(response => {
    console.log('Created document with ID:', response.data.id);
  })
  .catch(error => {
    console.error(error);
  });
  return (
    <button>Click Me!</button>
  );
}

function App() {
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
        
        
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          
        </a>
        <div>
      <h1>Data from Firestore:</h1>
      {data.length === 0 ? (
        <p>No data to display</p>
      ) : (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.name} {item.email}</li>
          ))}
        </ul>
      )}
    </div>
    <MyButton />
      </header>
    </div>
  );
}

export default App;
