import React, { useContext, useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { getAllUsers } from '../../tasksAPI/usersAxiosAPI';
// context
import { TasksChangeContext } from '../../contexts/TasksChangeContext';

const updateFormCSS = {
  padding: '1rem',
  margin: '1rem',
};

function UpdateModal(props) {
  // get the setter for tasksChange
  const { setTasksChange } = useContext(TasksChangeContext);
  // get all users from db
  // set state for list of users
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // get all users from mongodb
    async function usersForSelect() {
      const result = await getAllUsers();
      return result;
    }
    const allUsers = usersForSelect();
    allUsers.then(data => setUsers(data));
    // console.log('All users', users);
  }, []);
  
  const updateItemInfo = async (e) => {
    e.preventDefault();
    const itemData = {
      taskName: e.target.taskName.value,
      dueDate: e.target.dueDate.value,
      status: e.target.status.value,
      description: e.target.description.value,
      priorityLevel: e.target.priorityLevel.value,
      assignedUser: e.target.assignedUser.value,
    };

    console.log('Update data: ', itemData);
    const results = await axios.put(
      `${process.env.REACT_APP_PROD_BACKEND}/task/${props.itemIndex}`,
      itemData
    );
    //updateItemsArray(results.data);
    // setting context state
    setTasksChange(true);
    props.close();
  };

  // const updateItemsArray = (data) => {
  //   props.updateItemsArray(data);
  // };

  return (
    <Modal show={props.show} onHide={props.close}>
      <Modal.Header closeButton>
        <Modal.Title>Update</Modal.Title>
      </Modal.Header>
      <Form onSubmit={updateItemInfo} style={updateFormCSS}>
        <Form.Group controlId='taskName'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            defaultValue={props.itemInfo.taskName}
            type='text'
            name='taskName'
            placeholder='task name'
            required
          />
        </Form.Group>
        <Form.Group controlId='dueDate'>
          <Form.Label>End Date</Form.Label>
          <Form.Control
            defaultValue={props.itemInfo.dueDate}
            type='date'
            name='dueDate'
            required
          />
        </Form.Group>
        <Form.Group controlId='status'>
          <Form.Label>Status</Form.Label>
          <Form.Select name='status' defaultValue={props.itemInfo.status}>
            <option value='not started'>not started</option>
            <option value='In progress'>In progress</option>
            <option value='Completed'>Completed</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            defaultValue={props.itemInfo.imageUrl}
            as='textarea'
              name='description'
              rows={3}
          />
        </Form.Group>
        <Form.Group controlId='priorityLevel'>
          <Form.Label>Priority (1 lowest, 10 highest)</Form.Label>
          <Form.Control
            defaultValue={props.itemInfo.priorityLevel}
            type='number'
              name='priorityLevel'
              min='1'
              max='10'
              required
          />
        </Form.Group>
        <Form.Group controlId='assignedUser'>
          <Form.Label>Assigned to</Form.Label>
          <Form.Select
            defaultValue={props.itemInfo.assignedUser}
            name='assignedUser'
          >
            {users?.map(user => (<option value={user.userName} data-item={user._id}>{user.userName}</option>))}
            </Form.Select>
        </Form.Group>
        <Button variant='primary' type='submit'>
          Update
        </Button>
      </Form>
      <Modal.Footer>
        <Button variant='secondary' onClick={props.close}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateModal;
