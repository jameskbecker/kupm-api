import inviteController from '../controllers/invite';
import { Router } from 'express';

const inviteRouter = Router();

inviteRouter.post('/', inviteController.postInvite);

inviteRouter.get('/:id/join', () => {});

export default inviteRouter;
