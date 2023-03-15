import axios from 'axios';

export const addNewUser = async (values) => {
  const url = `${process.env.REACT_APP_LOCALHOST}/users`;
  try {
    const response = await axios.post(url, values);
    // console.dir(response.data);
    return 'User added!';
  } catch (err) {
    console.error(`${err} from axios task add user - post`);
  }
};

export const getAllUsers = async () => {
  const results = await axios.get(`${process.env.REACT_APP_LOCALHOST}/users`);
  return results.data;
};

export const getOneUser = async (name) => {
  const result = await axios.get(`${process.env.REACT_APP_LOCALHOST}/searchuser?name=${name}`);
  return result.data;
};