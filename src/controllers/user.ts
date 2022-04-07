import { selectCommentsByUserId } from '../db/queries/comment';
import { Request, Response } from 'express';
import { selectInvitesByUserId } from '../db/queries/invite';
import { selectAllUserTasks } from '../db/queries/task';
import { format, formatDistance } from 'date-fns';

const defaultBody = { success: false };
const defaultHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': 'http://localhost:3000',
};

const getDistance = (ts: string) =>
  formatDistance(new Date(ts), Date.now(), {
    addSuffix: true,
  });

const getNotifications = async (req: Request, res: Response) => {
  let body: any = defaultBody;
  res.set(defaultHeaders);

  try {
    const invites = await selectInvitesByUserId('');
    const comments = await selectCommentsByUserId('');
    if (!invites || !comments) {
      return;
    }

    const formattedInvites = invites.map((i) => {
      const formattedDate = `${getDistance(i.sent_at)} at ${format(
        new Date(i.sent_at),
        'hh:mm aa'
      )}`;
      return {
        id: i.id,
        type: 'invite',
        createdAt: i.sent_at,
        heading: `New Invite from ${i.last_name.toUpperCase()}, ${
          i.first_name
        }`,
        subHeading: `${i.project_name} - ${formattedDate}`,
        body: '',
      };
    });

    const formattedComments = comments.map((c) => {
      const formattedDate = `${getDistance(c.created_at)} at ${format(
        new Date(c.created_at),
        'hh:mm aa'
      )}`;
      return {
        id: c.id,
        type: 'comment',
        createdAt: c.created_at,
        heading: `New Comment from ${c.last_name.toUpperCase()}, ${
          c.first_name
        }`,
        subHeading: `${c.task_name} - ${formattedDate}`,
        body: c.content,
      };
    });

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
      body: format(new Date(t.created_at), "dd/LLL/y 'at' hh:mm aa"),
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
