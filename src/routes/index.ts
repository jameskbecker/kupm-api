import { Router } from 'express';
import inviteRouter from './inviteRouter';
import projectRouter from './projectRouter';
import taskRouter from './taskRouter';

const router = Router();
router.use('/projects', projectRouter);
router.use('/tasks', taskRouter);
router.use('/invites', inviteRouter);

export default router;
