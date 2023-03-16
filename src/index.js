import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const auth0Domain = process.env.REACT_APP_DOMAIN;
const auth0ClientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const redirectPage = `${process.env.REACT_APP_NETLIFY}alltasks`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain={auth0Domain}
    clientId={auth0ClientId}
    authorizationParams={{
      redirect_uri: redirectPage
    }}
  >
    <App />
  </Auth0Provider>
);


