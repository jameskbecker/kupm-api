import { Router } from 'express';
import projectData from '../mock-data/project';

const projectRouter = Router();

projectRouter.get('/', (req, res) => {
  res.json(projectData);
});

projectRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  const project = projectData.find((p) => p.id === id);

  if (!project) {
    res.json({
      error: 'Project not Found.',
    });
  }

  res.json(project);
});

export default projectRouter;
