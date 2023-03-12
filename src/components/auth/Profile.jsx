import React from 'react';
import { UserContext } from '../../contexts/UserContext';
// styles
import './Profile.css';

const Profile = () => {
  const user = React.useContext(UserContext);

  return (
      <div id='profile-navbar'>
        <p>{user.name}</p>
        <img src={user.picture} alt={user.name} />
      </div>
  );
};

export default Profile;
