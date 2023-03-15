import React from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { getOneUser, addNewUser } from '../../../tasksAPI/usersAxiosAPI';
// styles
import './Profile.css';

const Profile = () => {
  const userContext = React.useContext(UserContext);

  async function insertNewUser() {
    const userName = userContext.name || userContext.email;
    const result = await getOneUser(userName);
    if (result === []) {
      // if the user is not in the DB
      const values = { userName: userName };
      const resultDB = addNewUser(values);
      console.log(resultDB);
    }
  }

  insertNewUser();

  return (
    <div id='profile-navbar'>
      <p>{userContext.name}</p>
      <img src={userContext.picture} alt={userContext.name} />
    </div>
  );
};

export default Profile;
