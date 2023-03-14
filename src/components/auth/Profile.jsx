import React, { useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { getAllUsers, addNewUser } from '../../tasksAPI/usersAxiosAPI';
// styles
import './Profile.css';

const Profile = () => {
  const userContext = React.useContext(UserContext);

  // useEffect(() => {
  //   async function usersFromDB() {
  //     const result = await getAllUsers();
  //     return result;
  //   }
  //   const allUsers = usersFromDB();
  //   // user in db flag
  //   let userInDB = false;
  //   allUsers.map(dbUser => {
  //     if (dbUser.userName === userContext.name) {
  //       console.log(`db user userName: ${dbUser.userName}`);
  //       return userInDB = true;
  //     } else if (dbUser.userName === userContext.email) {
  //       return userInDB = true;
  //     }
  //     return false;
  //   });
    
  //   // if the user is not in the DB
  //   if (!userInDB) {
  //     // not in MongoDB collection
  //     const userName = userContext.name || userContext.email;
  //     const values = { userName: userName };
  //     const resultDB = addNewUser(values);
  //     console.log(resultDB);
  //   }
  // }, [userContext.email, userContext.name]);

  return (
    <div id='profile-navbar'>
      <p>{userContext.name}</p>
      <img src={userContext.picture} alt={userContext.name} />
    </div>
  );
};

export default Profile;
