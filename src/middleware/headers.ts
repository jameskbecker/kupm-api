import { NextFunction, Request, Response } from 'express';

const defaultHeaders = (req: Request, res: Response, next: NextFunction) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.set('Access-Control-Allow-Headers', '*');
  next();
};

export default defaultHeaders;
