import authentication from 'controllers/authentication';
import { Router } from 'express';

const authRouter = Router();

authRouter.get('/login', authentication.postLogin);
authRouter.get('/register', () => {});
authRouter.get('/reset', () => {});

export default authRouter;
