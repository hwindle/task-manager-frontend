import TaskComponent from "./TaskComponent";

function AllTasks({tasks}) {
  
  return (
    <section>
      {tasks.map((task, id) => {
        return <TaskComponent item={task} index={id} />;
      })}
    </section>
  )
}

export default AllTasks;