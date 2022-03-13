import projectController from '../controllers/project';
import { Router } from 'express';

const projectRouter = Router();

projectRouter.get('/', projectController.getProject);
projectRouter.post('/', projectController.postProject);

projectRouter.get('/:id', projectController.getProjectById);
projectRouter.put('/:id', projectController.updateProjectById);
projectRouter.delete('/:id', projectController.deleteProject);

projectRouter.get('/:id/tasks', projectController.getProjectTasks);

projectRouter.get('/:id/activity', projectController.getProjectActivity);

projectRouter.get('/:id/members', projectController.getProjectMembers);
//projectRouter.get('/:id/members/invite', () => {});

export default projectRouter;
