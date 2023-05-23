import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from './NavBar';
import { useNavigate, useLocation } from 'react-router-dom';
import firebaseApp from './InitFirebase';

function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const stateLocation = useLocation();

  useEffect(() => {
    const checkToken = async () => {
      try {
        if (stateLocation.state === undefined) {
          navigate('/sign-in');
          return;
        }

        const { token } = stateLocation.state;
        console.log('token', token);

        // Send the token to the server for validation
        const response = await axios.post('/api/auth/check-token', { token });

        // Fetch data from the server
        const dataResponse = await axios.get('/api/test-data');
        setData(dataResponse.data);
      } catch (error) {
        console.error(error);
        navigate('/sign-in');
      }
    };

    checkToken();
  }, [stateLocation.state, navigate]);

  return (
    <div className="App">
      <Navigation />
      <header className="App-header">
        <h1>Home</h1>
        {data.length === 0 ? (
          <p>No data to display</p>
        ) : (
          <ul>
            {data.map((item) => (
              <li key={item.id}>
                {item.name} {item.email}
              </li>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
}

export default Home;
