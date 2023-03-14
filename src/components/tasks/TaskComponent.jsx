import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { deleteTask } from '../../tasksAPI/tasksAxiosAPI';
import UpdateModal from './UpdateModal';

const TaskComponent = ({ item, index }) => {
  // state variables
  const [showUpdateModalStatus, setShowUpdateModalStatus] = useState(false);

  /***
   * functions to get, update + delete btns to work
   */
  const deleteItem = async (index) => {
    try {
      const result = deleteTask(index);
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
    // if (item.dueDate.getTime() > today.getTime() && item.status !== 'Completed') {
    //   dateClasses += ' overdue';
    // }
    // if date is in the data model convert to a nice string
    //niceDateString = item.dueDate.toLocaleDateString();
  }
  

  return (
    <article key={index} className='task-card'>
      <h4 className='task-name'>{item?.taskName}</h4>
      <p>
        <span className={dateClasses}>Due by: {niceDateString}</span>
        <span className='assigned-user'>Assigned to: {item?.assignedUser}</span>
      </p>
      <p>{item?.description}</p>
      <p>Priority: {item?.priorityLevel}</p>
      <p className='buttons'>
        <Button variant='success' onClick={() => showUpdateModal(item._id)}>
          Update
        </Button>
        <Button variant='warning' onClick={() => deleteItem(item._id)}>
          Delete
        </Button>
      </p>

      <UpdateModal
        show={showUpdateModalStatus}
        close={handleCloseUpdate}
        itemInfo={item}
        itemIndex={item._id}
      />
    </article>
  );
};

export default TaskComponent;
