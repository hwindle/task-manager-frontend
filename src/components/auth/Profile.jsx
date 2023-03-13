import React, { useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { getAllUsers, addNewUser } from '../../tasksAPI/usersAxiosAPI';
// styles
import './Profile.css';

const Profile = () => {
  const userContext = React.useContext(UserContext);

  useEffect(() => {
    const allUsers = getAllUsers();
    let userInDB = false;
    for (const dbUser in allUsers) {
      if (dbUser.userName === userContext.name) {
        userInDB = true;
      } else if (dbUser.userName === userContext.email) {
        userInDB = true;
      }
    }
    // if the user is not in the DB
    if (!userInDB) {
      // not in MongoDB collection
      const userName = userContext.name || userContext.email;
      const values = { userName: userName };
      const resultDB = addNewUser(values);
      console.log(resultDB);
    }
  }, []);

  return (
    <div id='profile-navbar'>
      <p>{userContext.name}</p>
      <img src={userContext.picture} alt={userContext.name} />
    </div>
  );
};

export default Profile;
