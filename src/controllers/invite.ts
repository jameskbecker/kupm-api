import {
  acceptInvite,
  insertInvite,
  selectInviteByProjectId,
} from '../db/queries/invite';
import { Request, Response } from 'express';
import { insertUserProject } from '../db/queries/userProject';
import { selectUserIdByEmail } from '../db/queries/user';

const defaultBody = { success: false };
const defaultHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': 'http://localhost:3000',
};

const postInvite = async (req: Request, res: Response) => {
  let body: any = defaultBody;
  res.set(defaultHeaders);

  try {
    await insertInvite();
    res.status(200);
    body.success = true;
    body.data = {};
  } catch (e: any) {
    console.log(e);
    res.status(503);
    body.error = e?.message;
  }

  res.json(body);
};

const postInviteJoin = async (req: Request, res: Response) => {
  let body: any = defaultBody;
  res.set(defaultHeaders);

  try {
    const dataPacket = await selectUserIdByEmail();
    const userId = dataPacket ? dataPacket[0].id : null;
    if (!userId) {
      console.log('no user id');
    }
    await insertUserProject(userId);
    await acceptInvite();
    //await selectInviteByProjectId();
    res.status(200);
    body.success = true;
    body.data = {
      projectId: '6f35f124-46d4-11ec-8b6c-d2f44fac733b',
      redirectPath: `/projects/${'6f35f124-46d4-11ec-8b6c-d2f44fac733b'}`,
    };
  } catch (e: any) {
    console.log(e);
    res.status(503);
    body.error = e?.message;
  }

  res.json(body);
};

const inviteController = {
  postInvite,
  postInviteJoin,
};
export default inviteController;
