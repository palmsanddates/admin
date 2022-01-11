import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './assets/scss/custom.scss';
import './assets/css/general.css';

import LightNavbar from './components/LightNavbar';

import Routes from './Routes';
import { AppContext } from './lib/contextLib';

import Auth from './services/auth.service';
import tokenPayload from './services/token-payload';

// import { Counter } from './features/counter/Counter';
// import './App.css';

function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
      onLoad();
    }, []);

    async function onLoad() {
      try {
        const token = tokenPayload();

        if (Object.keys(token).length) {
          if (token.exp * 1000 >= Date.now()) {
            userHasAuthenticated(true);

            setInterval(() => {
              Auth.logout();
              navigate('/login');

              userHasAuthenticated(false);
            }, token.exp * 1000 - Date.now());
          } else {
            Auth.logout();
            navigate('/login');
          }
        } else {
          userHasAuthenticated(false);
          navigate('/login');
        }
      } catch (e) {
        if (e !== 'No current user') {
          alert(e);
        }
      }

      setIsAuthenticating(false);
    }

  return (
    <div className="App">
      <LightNavbar userHasAuthenticated={userHasAuthenticated}></LightNavbar>
      <AppContext.Provider
        value={{ isAuthenticated, userHasAuthenticated, setIsAuthenticating }}
      >
        <Routes />
      </AppContext.Provider>
    </div>
  );
}

export default App;
