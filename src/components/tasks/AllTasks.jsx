import TaskComponent from "./TaskComponent";

function AllTasks({tasks}) {
  // let taskArr = [];
  // for (let task in tasks) {
  //   taskArr.push(task);
  // }
  // console.dir(taskArr);

  return (
    <section>
      {tasks.map((task, id) => {
        return <TaskComponent item={task} index={id} />;
      })}
    </section>
  )
}

export default AllTasks;