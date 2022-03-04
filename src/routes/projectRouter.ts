import projectController from 'controllers/project';
import { Router } from 'express';

const projectRouter = Router();

projectRouter.get('/', projectController.getProject);
projectRouter.post('/', projectController.postProject);

projectRouter.get('/:id', projectController.getProjectById);
projectRouter.put('/:id', projectController.updateProjectById);
projectRouter.delete('/:id', projectController.deleteProjectById);

projectRouter.get('/:id/tasks', projectController.getProjectTasks);

export default projectRouter;
