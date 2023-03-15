import TaskComponent from './TaskComponent';

function FilteredTasks({ tasks, name }) {

  const assignedTasks = tasks.filter(task => task.assignedUser === name); 
  // console.log('name: ', name);
  // console.dir(assignedTasks);

  return (
    <section>
      {assignedTasks.map((task, id) => {
          return <TaskComponent item={task} index={id} />;
        })}
    </section>
  );
}

export default FilteredTasks;
