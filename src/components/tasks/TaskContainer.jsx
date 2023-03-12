import React, { useState, useEffect } from 'react';
// contexts
import { UserContext } from '../../contexts/UserContext';
import { TasksChangeContext } from '../../contexts/TasksChangeContext';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
// axios API functions
import { getAllTasks } from '../../tasksAPI/tasksAxiosAPI';
// containers for the tabs
import AllTasks from './AllTasks';
import FilteredTasks from './FilteredTasks';


const TaskContainer = () => {
  const user = React.useContext(UserContext);
  // state
  const [tasks, setTasks] = useState([]);
  // get read only state value from useContext
  const { tasksChange } = React.useContext(TasksChangeContext);

  useEffect(() => {
    const data = getAllTasks();
    setTasks(data);
  }, [tasks, tasksChange]);
  const userTasks = tasks.filter(task => task.assignedUser === user.name);

  return (
    <Tabs
      defaultActiveKey="all"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="all" title="Home">
        <AllTasks tasks={tasks} />
      </Tab>
      <Tab eventKey="users" title="Profile">
        <FilteredTasks tasks={userTasks} name={user.name} />
      </Tab>
    </Tabs>
  );
};

export default TaskContainer;