import axios from 'axios';

export const tasksFormSubmit = async (values) => {
  const url = `${process.env.REACT_APP_LOCALHOST}/task`;
  try {
    const response = await axios.post(url, values);
    // console.dir(response.data);
    return 'Task added!';
  } catch (err) {
    console.error(`${err} from axios task add/post`);
  }
};

export const taskUpdateSubmit = async (id, values) => {
  try {
    const updateResponse = await axios.put(
      `${process.env.REACT_APP_LOCALHOST}/task/${id}`,
      values
    );
    console.dir(updateResponse.data);
    return 'Task updated';
  } catch (err) {
    console.error(`${err} from axios update Task put`);
  }
};

export const getAllTasks = async () => {
  const results = await axios.get(`${process.env.REACT_APP_LOCALHOST}/task`);
  return results.data;
};

export const deleteTask = async (id) => {
    if (!id) {
      console.log('No id given in delete task');
      return;
    }
    try {
      const deleteUrl = `${process.env.REACT_APP_LOCALHOST}/task/${id}`;
      const deleteResponse = await axios.delete(deleteUrl);
      console.log(deleteResponse.data);
    } catch (err) {
      console.error('error on delete: ' + err);
    }
    return 'item deleted';  
};