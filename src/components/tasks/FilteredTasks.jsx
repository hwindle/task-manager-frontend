import TaskComponent from './TaskComponent';

function FilteredTasks({ tasks, name }) {

  return (
    <section>
      {tasks.map((task, id) => {
          return <TaskComponent item={task} index={id} />;
        })}
    </section>
  );
}

export default FilteredTasks;
