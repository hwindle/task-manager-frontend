import { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Stack from 'react-bootstrap/Nav';
import { deleteTask } from '../../tasksAPI/tasksAxiosAPI';
import UpdateModal from './UpdateModal';
// context
import { TasksChangeContext } from '../../contexts/TasksChangeContext';
// CSS
import './TaskComponent.css';

const TaskComponent = ({ item, index }) => {
  // get the setter for tasksChange
  const { setTasksChange } = useContext(TasksChangeContext);
  // selected tab state
  const [selected, setSelectVal] = useState('#first');
  // declare variables
  let bVariant; // button variant
  let sVariant; // string variant
  let btext; // button text
  let stext; // string text
  let isOwner = true;
  // state variables for update
  const [showUpdateModalStatus, setShowUpdateModalStatus] = useState(false);

  // switches for priorities and statuses css classes
  switch (item.priorityLevel) {
    case 1:
    case 2:
    case 3:
    case 4:
      bVariant = 'dark';
      btext = 'Low';
      break;
    case 5:
    case 6:
    case 7:
      bVariant = 'secondary';
      btext = 'Medium';
      break;
    case 8:
    case 9:
    case 10:
      bVariant = 'primary';
      btext = 'High';
      break;
    default:
      bVariant = 'dark';
      btext = 'Low';
      break;
  }

  switch (item.status) {
    case 'Not started':
      sVariant = 'warning';
      stext = 'Not started';
      break;
    case 'Overdue':
      sVariant = 'danger';
      stext = 'Overdue';
      break;
    case 'Completed':
      sVariant = 'success';
      stext = 'Completed';
      break;
    default:
      sVariant = 'warning';
      stext = 'In progress';
      break;
  }

  /***
   * functions to get, update + delete btns to work
   */
  const deleteItem = async (index) => {
    try {
      const result = await deleteTask(index);
      console.log(result);
    } catch (err) {
      console.error('Delete failed: ', err);
    }
    // setting context state
    setTasksChange(true);
  };

  const showUpdateModal = () => {
    setShowUpdateModalStatus(true);
  };

  const handleCloseUpdate = () => setShowUpdateModalStatus(false);

  // date stuff
  let dateClasses = 'due-date';
  let niceDateString = 'no date';
  const today = new Date();
  const unixTimeDueDate = new Date(item.dueDate).getTime();
  if (item.dueDate) {
    if (unixTimeDueDate < today.getTime() && item.status !== 'Completed') {
      dateClasses += ' overdue';
      stext = 'Overdue';
    }
    // if date is in the data model convert to a nice string
    niceDateString = new Date(item.dueDate).toLocaleDateString();
  }

  return (
    <Card key={index} style={{ width: '35rem', margin: '3px auto' }}>
      <Card.Header>
        <Nav
          variant='tabs'
          defaultActiveKey='#first'
          onSelect={(selectedKey) => {
            setSelectVal(selectedKey);
            //console.log(selectedKey);
          }}>
          <Nav.Item>
            <Nav.Link href='#first'>Task Detail</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href='#second'>Properties</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href='#third'>Task Owner</Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      {selected === '#first' && (
        <Card.Body id='first'>
          <Card.Title
            className={
              item?.status !== 'Completed' ? 'task-name' : 'task-name completed'
            }>
            {item?.taskName}
          </Card.Title>
          <Card.Text>{item.description}</Card.Text>
        </Card.Body>
      )}
      {/* // second tab */}
      {selected === '#second' && (
        <Card.Body id='second'>
          <Card.Title>Assigned Attributes</Card.Title>
          <Card.Text>
            <span className={dateClasses}>Task due: {niceDateString} </span>
            <br />
            <span className='priority-text'>
              Priority: {item?.priorityLevel}
            </span>
          </Card.Text>
          {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
      )}
      {/* // third tab */}
      {selected === '#third' && (
        <Card.Body id='third'>
          <Card.Title>Task Owner</Card.Title>
          <Card.Text>
            <h4>Task owner: {item.assignedUser}</h4>
          </Card.Text>
          {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
      )}
      <Stack direction='horizontal' gap={3} style={{ margin: '5px' }}>
        <Button variant={bVariant} size='sm' style={{ marginRight: '5px' }}>
          Priority: {btext}
        </Button>
        <Button variant={sVariant} size='sm' style={{ marginRight: '5px' }}>
          Status: {stext}
        </Button>
        {isOwner && (
          <div style={{ marginLeft: 'auto' }}>
            <p className='buttons'>
              <Button
                variant='success'
                onClick={() => showUpdateModal(item._id)}>
                {/* pencil icon */}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  class='bi bi-pencil'
                  viewBox='0 0 16 16'>
                  <path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z' />
                </svg>
                &nbsp;&nbsp;
                Update
              </Button>
              <Button variant='danger' onClick={() => deleteItem(item._id)}>
                {/* Delete icon */}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  class='bi bi-trash'
                  viewBox='0 0 16 16'>
                  <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z' />
                  <path
                    fill-rule='evenodd'
                    d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'
                  />
                </svg>
                &nbsp;&nbsp;
                Delete
              </Button>
            </p>
          </div>
        )}
      </Stack>

      {/* // Update UpdateModal */}
      <UpdateModal
        show={showUpdateModalStatus}
        close={handleCloseUpdate}
        itemInfo={item}
        itemIndex={item._id}
      />
    </Card>
  );
};

export default TaskComponent;
