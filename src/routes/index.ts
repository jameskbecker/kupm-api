import { Router } from 'express';
import authRouter from './authRouter';
import inviteRouter from './inviteRouter';
import projectRouter from './projectRouter';
import taskRouter from './taskRouter';
import userRouter from './userRouter';

const router = Router();
router.use('/projects', projectRouter);
router.use('/tasks', taskRouter);
router.use('/invites', inviteRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);

export default router;
