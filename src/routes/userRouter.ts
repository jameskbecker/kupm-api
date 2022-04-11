import userController from '../controllers/user';
import { Router } from 'express';

const userRouter = Router();

userRouter.get('/:id', userController.getUser);
userRouter.get('/:id/notifications', userController.getNotifications);
userRouter.get('/:id/todo', userController.getTodo);

export default userRouter;
