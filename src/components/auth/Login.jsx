import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  // not authenticated - show login btn
  return (
    !isAuthenticated && (
      <button
        onClick={() =>
          loginWithRedirect()
        }>
        Log In
      </button>
    )
  );
};

export default Login;
