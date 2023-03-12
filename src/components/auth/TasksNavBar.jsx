import { Link } from 'react-router-dom';
import Logout from './Logout';
import Profile from './Profile';

const TasksNavBar = () => {
  return (
    <nav id='main-nav'>
      <ul className='top-navigation'>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/alltasks'>View Tasks</Link>
        </li>
        <li>
          <Link to='/createTask'>Create Task</Link>
        </li>
        <Logout />
        <Profile />
      </ul>
    </nav>
  );
};

export default TasksNavBar;
