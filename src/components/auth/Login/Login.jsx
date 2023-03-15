import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from 'react-bootstrap/Button';
import './Login.css';

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  // not authenticated - show login btn
  return (
      <Button variant='secondary' id='loginBtn'
        onClick={() =>
          loginWithRedirect()
        }>
        Log In
      </Button>
  );
};

export default Login;
