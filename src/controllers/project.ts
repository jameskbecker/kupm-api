import { format } from 'date-fns';
import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { selectInviteByProjectId } from '../db/queries/invite';
import {
  deleteProjectById,
  insertProject,
  selectProjectById,
  selectProjectNameById,
  updateProject,
} from '../db/queries/project';
import {
  deleteTaskByProjectId,
  selectTasksByProjectId,
} from '../db/queries/task';
import {
  deleteUserProjectByProjectId,
  insertUserProject,
  selectUserProjectMembers,
  selectUserProjects,
} from '../db/queries/userProject';

const defaultBody = { success: false };
const defaultHeaders = {
  'Content-Type': 'application/json',
  // 'Access-Control-Allow-Origin': 'http://localhost:3000',
};

const getProject = async (req: Request, res: Response) => {
  const { userId } = req.query;

  let userProjects;
  let body: any = defaultBody;
  res.set(defaultHeaders);
  try {
    userProjects = await selectUserProjects(<string>userId);

    body.success = true;
    body.data =
      userProjects?.map((p: any) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        isComplete: !!p.is_complete,
        priority: p.priority,
        createdAt: p.created_at,
        completedAt: p.completed_at,
        dueAt: format(new Date(p.due_at), "yyyy-MM-dd'T'HH:mm"),
        owner: `${p.owner_last_name.toUpperCase()}, ${p.owner_first_name}`,
      })) || [];
    res.status(200);
  } catch (e: any) {
    console.log(e);
    body.error = e?.message;
    res.status(501);
  }

  res.json(body);
};

const postProject = async (req: Request, res: Response) => {
  let body: any = defaultBody;
  res.set(defaultHeaders);

  try {
    const projectId = uuid();
    await insertProject(projectId, req.body);
    await insertUserProject(projectId, req.body.createdBy);

    res.status(200);
    body.success = true;
    body.data = {};
  } catch (e: any) {
    console.log(e);
    res.status(501);
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
    res.status(501);
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
    res.status(501);
    body.error = e?.message;
  }

  res.json(body);
};

const deleteProject = async (req: Request, res: Response) => {
  const id = req.params.id;
  let body: any = defaultBody;
  res.set(defaultHeaders);

  try {
    await deleteTaskByProjectId(id);
    await deleteUserProjectByProjectId(id);
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
    res.status(501);
    body.error = e?.message;
  }

  res.json(body);
};

const getProjectTasks = async (req: Request, res: Response) => {
  const id = req.params.id;
  let body: any = defaultBody;

  res.set(defaultHeaders);
  try {
    const { name, description }: any = await selectProjectNameById(id);

    if (!name || !description) {
    }

    const tasks = await selectTasksByProjectId(id);
    if (!tasks) {
      res.status(404);
      body.error = 'Tasks not Found.';
    } else {
      body.success = true;
      body.data = {
        name,
        description,
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
    res.status(501);
    body.error = e?.message;
  }

  res.json(body);
};

const getProjectMembers = async (req: Request, res: Response) => {
  let members;
  let body: any = defaultBody;
  res.set(defaultHeaders);
  try {
    members = await selectUserProjectMembers(req.params.id);

    body.success = true;
    console.log(members);
    body.data =
      members?.map((m: any) => ({
        id: m.id,
        firstName: m.first_name,
        lastName: m.last_name,
        isOwner: Boolean(m.is_owner),
        canRead: Boolean(m.can_read),
        canWrite: Boolean(m.can_write),
        projectId: m.project_id,
        joinedAt: format(new Date(m.created_at), "dd/MM/y 'at' hh:mm aa"),
        userId: m.user_id,
      })) || [];
    res.status(200);
  } catch (e: any) {
    console.log(e);
    body.error = e?.message;
    res.status(501);
  }

  res.json(body);
};

const getProjectActivity = async (req: Request, res: Response) => {
  let invites;
  let body: any = defaultBody;
  res.set(defaultHeaders);
  try {
    invites = await selectInviteByProjectId('');
    if (!invites) {
      console.log('invite data error');
      return;
    }
    const formattedInvites = invites.map((i) => {
      return {
        heading: `${i.last_name.toUpperCase()}, ${i.first_name} Sent an Invite`,
        subheading: i.sent_at,
        body: ``,
      };
    });

    body.success = true;

    body.data = [...formattedInvites];
    res.status(200);
  } catch (e: any) {
    console.log(e);
    body.error = e?.message;
    res.status(501);
  }

  res.json(body);
};

const projectController = {
  getProject,
  postProject,
  getProjectById,
  updateProjectById,
  deleteProject,
  getProjectTasks,
  getProjectMembers,
  getProjectActivity,
};
export default projectController;
