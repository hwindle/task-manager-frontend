import TaskComponent from './TaskComponent';

function FilteredTasks({ tasks, name }) {
  // let taskArr = [];
  // for (let task in tasks) {
  //   if (task.assignedName === name) {
  //     taskArr.push(task);
  //   }
  // }

  return (
    <section>
      {tasks.map((task, id) => {
          return <TaskComponent item={task} index={id} />;
        })}
    </section>
  );
}

export default FilteredTasks;
