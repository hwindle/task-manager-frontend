import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { LinkContainer } from 'react-router-bootstrap';
//import { Link } from 'react-router-dom';
import Logout from './Logout/Logout';
import Profile from './Profile/Profile';
// icon
import bpuss from '../../images/bpuss2_icon.png';

const TasksNavBar = () => {
  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand href='#home'>
          <img
            alt='Bagpuss the cat'
            src={bpuss} //"../assets/bpuss2_icon.png"
            width='50'
            height='50'
            className='d-inline-block align-top'
          />{' '}
          Task Manager
        </Navbar.Brand>
        <Stack direction='horizontal' gap={3}>
          <LinkContainer to='/alltasks'>
            <Button variant='secondary'>View Tasks</Button>
          </LinkContainer>

          <LinkContainer to='/createTask'>
            <Button variant='secondary'>Create Task</Button>
          </LinkContainer>
          <Logout />
          <Profile />
        </Stack>
      </Container>
    </Navbar>
  );
};

export default TasksNavBar;
