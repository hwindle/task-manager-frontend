import axios from 'axios';

export const tasksFormSubmit = async (values) => {
  const url = 'http://localhost:3010/task';
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
      `http://localhost:3010/task/${id}`,
      values
    );
    console.dir(updateResponse.data);
    return 'Task updated';
  } catch (err) {
    console.error(`${err} from axios update Task put`);
  }
};

export const getAllTasks = async () => {
  const results = await axios.get('http://localhost:3010/task');
  return results.data;
};

export const deleteTask = async (id) => {
    if (!id) {
      console.log('No id given in delete task');
      return;
    }
    try {
      const deleteUrl = `http://localhost:3010/task/${id}`;
      const deleteResponse = await axios.delete(deleteUrl);
      console.log(deleteResponse.data);
    } catch (err) {
      console.error('error on delete: ' + err);
    }
    return 'item deleted';  
};