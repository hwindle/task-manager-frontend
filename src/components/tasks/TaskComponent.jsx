import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Stack from 'react-bootstrap/Nav';
import { deleteTask } from '../../tasksAPI/tasksAxiosAPI';
import UpdateModal from './UpdateModal';

const TaskComponent = ({ item, index }) => {
  // selected tab state
  const [selected, setSelectVal] = useState('#first');
  // declare variables
  let bVariant;
  let sVariant;
  let btext;
  let stext;
  let isOwner = true;
  // state variables for update
  const [showUpdateModalStatus, setShowUpdateModalStatus] = useState(false);

  // switches for priorities and statuses css classes
  switch (item.priorityLevel) {
    case 1 - 4:
      bVariant = 'dark';
      btext = 'Low';
      break;
    case 5 - 7:
      bVariant = 'secondary';
      btext = 'Medium';
      break;
    case 8 - 10:
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
  };

  const showUpdateModal = () => {
    setShowUpdateModalStatus(true);
  };

  const handleCloseUpdate = () => setShowUpdateModalStatus(false);

  // date stuff
  let dateClasses = 'due-date';
  let niceDateString = 'no date';
  const today = new Date();
  if (item.dueDate) {
    if (item.dueDate > today.getTime() && item.status !== 'Completed') {
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
            <h4 className={dateClasses}>Task due: {niceDateString}</h4>
            <br></br>
            <h5>Priority: {item?.priorityLevel}</h5>
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
                Update
              </Button>
              <Button variant='danger' onClick={() => deleteItem(item._id)}>
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
