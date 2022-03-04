import { Router } from 'express';
import {
  deleteTaskById,
  editTaskById,
  insertTask,
  selectParentNameById,
  selectSubTasks,
} from '../db/task';

const taskRouter = Router();
const defaultBody = { success: false };
const defaultHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': 'http://localhost:3000',
};

taskRouter.post('/', async (req, res) => {
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
});

taskRouter.put('/:id', async (req, res) => {
  const id = req.params.id;
  let body: any = defaultBody;
  res.set(defaultHeaders);

  try {
    const task = await editTaskById(id, req.body);
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
});

taskRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;
  let body: any = defaultBody;
  res.set(defaultHeaders);

  try {
    const task = await deleteTaskById(id);
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
});

taskRouter.get('/:id/subtasks', async (req, res) => {
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
});

export default taskRouter;
