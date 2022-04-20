import { Request, Response } from 'express';
import { insertUser, selectPasswordByEmail } from '../db/queries/user';
import bcrypt from 'bcrypt';

export type LoginPayload = {
  email: string;
  password: string;
};

const postLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    res.json({ success: false, error: 'check request body' });
    return;
  }

  try {
    const results = await selectPasswordByEmail(email);
    if (!(results instanceof Array)) return;

    if (!results[0]) {
      res.json({ success: false, error: 'Incorrect Email' });
    }

    const isValid = await bcrypt.compare(password, results[0].password);
    if (!isValid) {
      res.status(401);
      res.json({ success: false, error: 'Incorrect Password' });
      return;
    }

    res.status(200);
    res.json({ success: true });
  } catch (e) {
    console.log(e);
    res.status(501);
    res.json({ success: false });
  }
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
    const hash = await bcrypt.hash(body.password, 10);
    const result = await insertUser({ ...body, password: hash });
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
