import { selectCommentsByUserId } from '../db/queries/comment';
import { Request, Response } from 'express';
import { selectInvitesByUserId } from '../db/queries/invite';
import { selectAllUserTasks } from '../db/queries/task';

const defaultBody = { success: false };
const defaultHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': 'http://localhost:3000',
};

const getNotifications = async (req: Request, res: Response) => {
  let body: any = defaultBody;
  res.set(defaultHeaders);

  try {
    const invites = await selectInvitesByUserId('');
    const comments = await selectCommentsByUserId('');
    if (!invites || !comments) {
      return;
    }
    const formattedInvites = invites.map((i) => ({
      id: i.id,
      type: 'invite',
      createdAt: i.sent_at,
      heading: `New Invite from ${i.last_name.toUpperCase()}, ${i.first_name}`,
      subHeading: `${i.project_name} - ${i.sent_at}`,
      body: '',
    }));

    const formattedComments = comments.map((c) => ({
      id: c.id,
      type: 'comment',
      createdAt: c.created_at,
      heading: `New Comment from ${c.last_name.toUpperCase()}, ${c.first_name}`,
      subHeading: `${c.task_name} - ${c.created_at}`,
      body: c.content,
    }));

    res.status(200);
    body.success = true;
    body.data = [...formattedInvites, ...formattedComments].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (e: any) {
    console.log(e);
    res.status(503);
    body.error = e?.message;
  }

  res.json(body);
};

const getTodo = async (req: Request, res: Response) => {
  let body: any = defaultBody;
  res.set(defaultHeaders);

  try {
    const upcomingTasks = await selectAllUserTasks('');

    if (!upcomingTasks) {
      return;
    }
    const formattedTasks = upcomingTasks.map((t: any) => ({
      id: t.id,
      projectId: t.project_id,
      type: 'task',
      createdAt: t.created_at,
      heading: t.name,
      subHeading: t.project_name,
      body: t.created_at,
    }));

    res.status(200);
    body.success = true;
    body.data = [...formattedTasks].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (e: any) {
    console.log(e);
    res.status(503);
    body.error = e?.message;
  }

  res.json(body);
};

const userController = { getNotifications, getTodo };
export default userController;
