import axios from 'axios';

export const addNewUser = async (values) => {
  const url = 'http://localhost:3010/users';
  try {
    const response = await axios.post(url, values);
    // console.dir(response.data);
    return 'User added!';
  } catch (err) {
    console.error(`${err} from axios task add user - post`);
  }
};

export const getAllUsers = async () => {
  const results = await axios.get('http://localhost:3010/users');
  return results.data;
};