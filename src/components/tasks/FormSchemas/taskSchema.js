import * as yup from 'yup';

const taskSchema = yup.object().shape({
  taskName: yup.string().min(3).max(50).trim().required('Required'),
  dueDate: yup.date().default(() => new Date()),
  status: yup.string().required(),
  description: yup.string().optional(),
  priorityLevel: yup.number().min(1).max(10).required(),
  assignedUser: yup.string().min(1).max(60).required('Required')
});

export default taskSchema;