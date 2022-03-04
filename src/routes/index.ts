import { Router } from 'express';
import projectRouter from './projectRouter';
import taskRouter from './taskRouter';

const router = Router();
router.use('/projects', projectRouter);
router.use('/tasks', taskRouter);

export default router;
