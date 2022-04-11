import { Request, Response } from 'express';

const postLogin = (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(email, password);
};

export default { postLogin };
