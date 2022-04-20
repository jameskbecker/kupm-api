import { insertUser } from '../db/queries/user';
import { Request, Response } from 'express';

const postLogin = (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(email, password);
};

export type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const postRegister = async (req: Request, res: Response) => {
  const body: RegisterPayload = req.body;

  try {
    const result = await insertUser(body);
    console.log(result);
    res.status(200);
    res.json(result);
  } catch (e: any) {
    if (!e || !e.code) {
      res.status(501);
      console.log(e);
      res.json({ success: false, error: 'An unknown error occured' });
    }

    switch (e.code) {
      case 'ER_DUP_ENTRY':
        res.status(200);
        res.json({ success: false, error: 'Email already in use' });
        return;

      default:
        console.log(e);
        res.status(501);
        res.json({ success: false, error: 'An unknown error occured' });
        return;
    }
  }
};

export default { postLogin, postRegister };
