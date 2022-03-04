import {
  deleteProject,
  updateProject,
  insertProject,
  selectAllProjects,
  selectProjectById,
  selectProjectNameById,
} from 'db/project';
import { selectTasksByProjectId } from 'db/task';
import { Request, Response } from 'express';

const defaultBody = { success: false };
const defaultHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': 'http://localhost:3000',
};

const getProject = async (req: Request, res: Response) => {
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
};

const postProject = async (req: Request, res: Response) => {
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
};

const getProjectById = async (req: Request, res: Response) => {
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
};

const updateProjectById = async (req: Request, res: Response) => {
  const id = req.params.id;
  let body: any = defaultBody;
  res.set(defaultHeaders);

  try {
    const project = await updateProject(id, req.body);
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
};

const deleteProjectById = async (req: Request, res: Response) => {
  const id = req.params.id;
  let body: any = defaultBody;
  res.set(defaultHeaders);

  try {
    const project = await deleteProject(id);
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
};

const getProjectTasks = async (req: Request, res: Response) => {
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
};

const projectController = {
  getProject,
  postProject,
  getProjectById,
  updateProjectById,
  deleteProjectById,
  getProjectTasks,
};
export default projectController;
