import React from 'react';
import { UserContext } from '../../contexts/UserContext';
import { getAllUsers, addNewUser } from '../../tasksAPI/usersAxiosAPI';
// styles
import './Profile.css';

const Profile = () => {
  const userContext = React.useContext(UserContext);

  const allUsers = getAllUsers();
  if (!(allUsers.find(userContext.name) || allUsers.find(userContext.email)) ) {
    // not in MongoDB collection
    const values = {userName: userContext.name};
    const resultDB = addNewUser(values);
    console.log(resultDB);
  }

  return (
      <div id='profile-navbar'>
        <p>{userContext.name}</p>
        <img src={userContext.picture} alt={userContext.name} />
      </div>
  );
};

export default Profile;
