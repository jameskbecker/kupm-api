import taskController from '../controllers/task';
import { Router } from 'express';

const taskRouter = Router();

taskRouter.post('/', taskController.postTask);

taskRouter.put('/:id', taskController.updateTaskById);
taskRouter.delete('/:id', taskController.deleteTask);

taskRouter.get('/:id/subtasks', taskController.getSubtasks);

taskRouter.get('/:id/comments', () => {}); //redundant?
taskRouter.post('/:id/comments', () => {});

export default taskRouter;
