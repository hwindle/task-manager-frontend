import React, { useState, useEffect } from 'react';
// forms
import { useFormik } from 'formik';
import taskSchema from './FormSchemas/taskSchema';
import { tasksFormSubmit } from '../../tasksAPI/tasksAxiosAPI';
import { getAllUsers } from '../../tasksAPI/usersAxiosAPI';
// Bootstrap & styles
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import './CreateTaskForm';

const CreateTaskForm = () => {
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

  const currentDate = new Date().toISOString().slice(0, 10);

  // flash message at bottom
  const [successMessage, setSuccessMessage] = useState('');
  /***
   * Other functions for the form logic
   */
  const onSubmit = async (values, actions) => {
    const msg = await tasksFormSubmit(values);
    // console.log(msg);
    setSuccessMessage(msg);
    actions.resetForm();
  };

  // gets the values from the oneEngine prop obj if this is an update
  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      taskName: '',
      dueDate: currentDate,
      status: 'not started',
      description: '',
      priorityLevel: 5,
      assignedUser: 'me',
    },
    validationSchema: taskSchema,
    onSubmit,
  });

  return (
    <section>
      <h3 style={{ textAlign: 'center', lineHeight: 3 }}>Add a Task</h3>
      <Form
        className='d-flex justify-content-center align-items-center flex-column'
        onSubmit={handleSubmit}>
        <Form.Group as={Row} className='mb-3 w-75' controlId='taskName'>
          <Form.Label column xs='12' sm='3' style={{ textAlign: 'right' }}>
            Title
          </Form.Label>
          <Col xs='12' sm='9'>
            <Form.Control
              type='text'
              name='taskName'
              placeholder='task name'
              required
              error={errors?.taskName}
              onChange={handleChange}
              onBlur={handleBlur}
              defaultValue={values?.taskName}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3 w-75' controlId='dueDate'>
          <Form.Label column xs='12' sm='3' style={{ textAlign: 'right' }}>
            End Date
          </Form.Label>
          <Col xs='12' sm='9'>
            <Form.Control
              type='date'
              name='dueDate'
              defaultValue={currentDate}
              required
              error={errors?.dueDate}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3 w-75' controlId='status'>
          <Form.Label column xs='12' sm='3' style={{ textAlign: 'right' }}>
            Status
          </Form.Label>
          <Col xs='12' sm='9'>
            <Form.Select
              name='status'
              error={errors?.status}
              onChange={handleChange}
              onBlur={handleBlur}
              defaultValue={'not started'}>
              <option value='not started'>not started</option>
              <option value='In progress'>In progress</option>
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3 w-75' controlId='description'>
          <Form.Label column xs='12' sm='3' style={{ textAlign: 'right' }}>
            Description
          </Form.Label>
          <Col xs='12' sm='9'>
            <Form.Control
              as='textarea'
              name='description'
              rows={3}
              error={errors?.description}
              onChange={handleChange}
              onBlur={handleBlur}
              defaultValue={values?.description}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3 w-75' controlId='priorityLevel'>
          <Form.Label column xs='12' sm='3' style={{ textAlign: 'right' }}>
            Priority (1 lowest, 10 highest)
          </Form.Label>
          <Col xs='12' sm='9'>
            <Form.Control
              type='number'
              name='priorityLevel'
              min='1'
              max='10'
              defaultValue={5}
              required
              error={errors?.priorityLevel}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3 w-75' controlId='assignedUser'>
          <Form.Label column xs='12' sm='3' style={{ textAlign: 'right' }}>
            Assigned to
          </Form.Label>
          <Col xs='12' sm='9'>
            <Form.Select
              name='assignedUser'
              error={errors?.assignedUser}
              onChange={handleChange}
              onBlur={handleBlur}
              defaultValue={'Me'}>
              {users?.map((user) => (
                <option value={user.userName} data-item={user._id}>
                  {user.userName}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>

        <div>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </div>
      </Form>

      {successMessage ? (
        <Alert
          style={{ width: '75%', margin: '2rem auto' }}
          variant={'success'}>
          {successMessage}
        </Alert>
      ) : (
        ''
      )}
    </section>
  );
};

export default CreateTaskForm;
