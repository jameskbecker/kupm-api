import { Router } from 'express';
import {
  deleteProjectById,
  editProjectById,
  insertProject,
  selectAllProjects,
  selectProjectById,
} from '../db/project';

const projectRouter = Router();

projectRouter.get('/', async (req, res) => {
  try {
    const projects = await selectAllProjects();
    res.set({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
    });
    res.status(200).json(projects);
  } catch (e: any) {
    console.log(e);
    res.status(503);
    res.json({ error: e.message() });
  }
});

projectRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const project = await selectProjectById(id);
    if (!project) {
      res.json({
        error: 'Project not Found.',
      });
    }

    res.set({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
    });
    res.status(200).json(project);
  } catch (e: any) {
    res.status(503);
    res.json({ error: e.message() });
  }
});

projectRouter.post('/', async (req, res) => {
  const projects = await insertProject(req.body);
  try {
    res.set({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
    });
  } catch (e: any) {
    console.log(e);
    res.status(503);
    res.json({ error: e.message() });
  }
  res.status(200).json(projects);
});

projectRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const project = await deleteProjectById(id);
    if (!project) {
      res.json({
        error: 'Project not Found.',
      });
    }

    res.set({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
    });
    res.status(200).json(project);
  } catch (e: any) {
    res.status(503);
    res.json({ error: e.message() });
  }
});

projectRouter.put('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const project = await editProjectById(id, req.body);
    if (!project) {
      res.json({
        error: 'Project not Found.',
      });
      return;
    }

    res.set({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
    });
    res.status(200).json(project);
  } catch (e: any) {
    res.status(503);
    res.json({ error: e.message });
  }
});

export default projectRouter;
