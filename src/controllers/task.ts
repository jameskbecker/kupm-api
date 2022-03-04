import {
  deleteTask,
  insertTask,
  selectParentNameById,
  selectSubTasks,
  updateTask,
} from 'db/task';
import { Request, Response } from 'express';

const defaultBody = { success: false };
const defaultHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': 'http://localhost:3000',
};

const postTask = async (req: Request, res: Response) => {
  let body: any = defaultBody;
  res.set(defaultHeaders);

  try {
    await insertTask(req.body);
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

const updateTaskById = async (req: Request, res: Response) => {
  const id = req.params.id;
  let body: any = defaultBody;
  res.set(defaultHeaders);

  try {
    const task = await updateTask(id, req.body);
    if (!task) {
      res.status(404);
      body.error = 'Task not Found.';
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

const deleteTaskById = async (req: Request, res: Response) => {
  const id = req.params.id;
  let body: any = defaultBody;
  res.set(defaultHeaders);

  try {
    const task = await deleteTask(id);
    if (!task) {
      res.status(404);
      body.error = 'Task not Found.';
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

const getSubtasks = async (req: Request, res: Response) => {
  let subtasks;
  let body: any = defaultBody;
  res.set(defaultHeaders);
  try {
    const parent = await selectParentNameById(req.params.id);
    if (!parent) {
    }
    subtasks = await selectSubTasks(req.params.id);

    body.success = true;
    body.data = {
      projectName: parent.project_name,
      parentName: parent.name,
      subtasks:
        subtasks?.map((t: any) => ({
          id: t.id,
          name: t.name,
          description: t.description,
          isComplete: Boolean(t.is_complete),
          createdAt: t.created_at,
          projectId: t.project_id,
        })) || [],
    };
    res.status(200);
  } catch (e: any) {
    console.log(e);
    body.error = e?.message;
    res.status(503);
  }

  res.json(body);
};

const taskController = {
  postTask,
  updateTaskById,
  deleteTaskById,
  getSubtasks,
};
export default taskController;
