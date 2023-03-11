import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Logout = () => {
  const { isAuthenticated, logout } = useAuth0();
  // authenticated - show log out btn
  return (
    isAuthenticated && (
      <button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }>
        Log Out
      </button>
    )
  );
};

export default Logout;
