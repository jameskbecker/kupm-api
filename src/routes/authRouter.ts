import authentication from '../controllers/authentication';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/login', authentication.postLogin);
authRouter.post('/register', () => {});
authRouter.post('/reset', () => {});

export default authRouter;
