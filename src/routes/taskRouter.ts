import { Router } from 'express';
import {
  deleteTaskById,
  editTaskById,
  insertTask,
  selectSubTasks,
} from '../db/task';

const taskRouter = Router();
const defaultBody = { success: false };
const defaultHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': 'http://localhost:3000',
};

taskRouter.get('/:id/subtasks', async (req, res) => {
  let subtasks;
  let body: any = defaultBody;
  res.set(defaultHeaders);
  try {
    subtasks = await selectSubTasks(req.params.id);
    console.log('`', subtasks);
    body.success = true;
    body.data = {
      projectName: subtasks[0]?.project_name,
      parentName: subtasks[0]?.parent_name,
      subtasks:
        subtasks?.map((t: any) => ({
          id: t.id,
          name: t.name,
          description: t.description,
          createdAt: t.created_at,
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

export default taskRouter;
