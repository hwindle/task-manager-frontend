import TasksNavBar from "../components/auth/TasksNavBar";
import TaskContainer from "../components/tasks/TaskContainer";

const MainTaskList = () => {
  return (
    <div>
      <TasksNavBar />
      <TaskContainer />
    </div>
  );
};

export default MainTaskList;