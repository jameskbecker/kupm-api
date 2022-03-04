import { Router } from 'express';
import {
  deleteProjectById,
  editProjectById,
  insertProject,
  selectAllProjects,
  selectProjectById,
  selectProjectNameById,
} from '../db/project';
import { selectTasksByProjectId } from '../db/task';

const projectRouter = Router();
const defaultBody = { success: false };
const defaultHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': 'http://localhost:3000',
};

projectRouter.get('/', async (req, res) => {
  let projects;
  let body: any = defaultBody;
  res.set(defaultHeaders);
  try {
    projects = await selectAllProjects();

    body.success = true;
    body.data =
      projects?.map((p: any) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        isComplete: !!p.is_complete,
        priority: p.priority,
        createdAt: p.created_at,
        completedAt: p.completed_at,
        memberGroupId: null,
        owner: `${p.owner_last_name.toUpperCase()}, ${p.owner_first_name}`,
      })) || [];
    res.status(200);
  } catch (e: any) {
    console.log(e);
    body.error = e?.message;
    res.status(503);
  }

  res.json(body);
});

projectRouter.post('/', async (req, res) => {
  let body: any = defaultBody;
  res.set(defaultHeaders);

  try {
    await insertProject(req.body);
    res.status(200);
    //const project = await selectProjectById('last');
    body.success = true;
    body.data = {};
  } catch (e: any) {
    console.log(e);
    res.status(503);
    body.error = e?.message;
  }

  res.json(body);
});

projectRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  let body: any = defaultBody;

  res.set(defaultHeaders);
  try {
    const project = await selectProjectById(id);
    if (!project) {
      res.status(404);
      body.error = 'Project not Found.';
    } else {
      body.success = true;
      body.data = project;
      res.status(200);
    }
  } catch (e: any) {
    res.status(503);
    body.error = e?.message;
  }

  res.json(body);
});

projectRouter.put('/:id', async (req, res) => {
  const id = req.params.id;
  let body: any = defaultBody;
  res.set(defaultHeaders);

  try {
    const project = await editProjectById(id, req.body);
    if (!project) {
      res.status(404);
      body.error = 'Project not Found.';
    } else {
      res.status(200);
      body.data = {};
    }
  } catch (e: any) {
    console.log(e);
    res.status(503);
    body.error = e?.message;
  }

  res.json(body);
});

projectRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;
  let body: any = defaultBody;
  res.set(defaultHeaders);

  try {
    const project = await deleteProjectById(id);
    if (!project) {
      res.status(404);
      body.error = 'Project not Found.';
    } else {
      res.status(200);
      body.data = {};
    }
  } catch (e: any) {
    console.log(e);
    res.status(503);
    body.error = e?.message;
  }

  res.json(body);
});

projectRouter.get('/:id/tasks', async (req: any, res) => {
  const id = req.params.id;
  let body: any = defaultBody;

  res.set(defaultHeaders);
  try {
    const projectName = await selectProjectNameById(id);

    if (!projectName) {
    }

    const tasks = await selectTasksByProjectId(id);
    if (!tasks) {
      res.status(404);
      body.error = 'Tasks not Found.';
    } else {
      body.success = true;
      body.data = {
        name: projectName,
        tasks:
          tasks.map((t: any) => ({
            id: t.id,
            name: t.name,
            description: t.description,
            isComplete: Boolean(t.is_complete),
            createdAt: t.created_at,
            projectId: t.project_id,
          })) || [],
      };
      res.status(200);
    }
  } catch (e: any) {
    res.status(503);
    body.error = e?.message;
  }

  res.json(body);
});

export default projectRouter;
