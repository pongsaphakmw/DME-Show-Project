import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from './NavBar';
import { useNavigate, useLocation } from 'react-router-dom';
import PopupPost from './HomePageComponents/PopupPost';
import './HomePageComponents/PopupPost.css';

function Home() {
  const navigate = useNavigate();
  const stateLocation = useLocation();
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        if (stateLocation.state === undefined) {
          navigate('/sign-in');
          return;
        }

        const token = stateLocation.state.token;
        // console.log('token', token);

        // Send the token to the server for validation
        const response = await axios.post('/api/auth/check-token', { token });
        const responseUid = response.data.uid;

        if (!response.data.verified){
          throw new Error('User not verified');
        }

        setUser(responseUid);
        // Fetch data from the server
        
      } catch (error) {
        console.error(error);
        navigate('/sign-in');
      }
    };

    checkToken();
  }, [stateLocation.state, navigate]);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/posts/:postId');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <Navigation />
      <header className="App-header">
        <h1>Home</h1>
      
      <div className='Body'>
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
      <PopupPost />
     </div>
      </header>
    </div>
  );
}

export default Home;
