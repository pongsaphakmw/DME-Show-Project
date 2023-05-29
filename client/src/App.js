import logo from './logo.svg';
import './App.css';
import LandingPageApp from './LandingPage';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpPageApp from './components/SignUpPage';
import SignInPageApp from './components/SignInPageApp';
import Home from './components/HomePage';
import FooterContribute from './components/Contribute';
function MyButton() {
  const data = {
    name: 'Torza555',
    email: 'tor2545@gmail.com',
    registerDate: '26/5/2566',
    profileIMG: 'เท่',
    detail: 'สุดยอดเดกเปรตแห่งปี',
  }
  axios.post('/api/test-post-data', data)
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

function TestApp() {
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

function App(){
  return (
    <div>
      <Router>
          <Routes>
              <Route path="/" exact element={<LandingPageApp/>} />
              <Route path="/sign-up" element={<SignUpPageApp/>} />
              <Route path='/sign-in' element={<SignInPageApp/>} />
              <Route path='/home' element={<Home/>} />
              {/* <Route path='/support' element={<Support/>} /> */}
              <Route path='/contributor' element={<FooterContribute/>} />
              <Route path='/test' element={<TestApp/>} />
          </Routes>
      </Router>
    </div>
  )
}

export default App;
