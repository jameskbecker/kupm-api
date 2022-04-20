import authentication from '../controllers/authentication';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/login', authentication.postLogin);
authRouter.post('/register', authentication.postRegister);
authRouter.post('/reset', () => {});

export default authRouter;
