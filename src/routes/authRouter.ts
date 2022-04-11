import { Router } from 'express';

const authRouter = Router();

authRouter.get('/login', () => {});
authRouter.get('/register', () => {});
authRouter.get('/reset', () => {});

export default authRouter;
