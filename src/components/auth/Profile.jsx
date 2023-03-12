import React from 'react';
import { UserContext } from '../../contexts/UserContext';

const Profile = () => {
  const user = React.useContext(UserContext);

  return (

      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
      </div>
  );
};

export default Profile;
