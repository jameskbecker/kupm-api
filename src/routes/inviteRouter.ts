import inviteController from '../controllers/invite';
import { Router } from 'express';

const inviteRouter = Router();

inviteRouter.post('/', inviteController.postInvite);

inviteRouter.post('/:id/join', inviteController.postInviteJoin);

export default inviteRouter;
