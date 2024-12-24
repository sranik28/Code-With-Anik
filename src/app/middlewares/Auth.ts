import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AppError } from '../errors/AppErrors';
import config from '../config';
const auth = (req: Request, res: Response, next: NextFunction) => {
  // const authHeader = req.headers.authorization;
  const authHeader = req.headers.authorization || '';

  
  
  // if (!authHeader || !authHeader.startsWith('Bearer ')) {
  //   throw new AppError(401, 'You are not authorized');
  // }
  const token = authHeader.split(' ')[1];
  if (!token) {
    throw new AppError(401, 'You are not authorized');
  }
  
  console.log("opadjasd",{token});
  if (!authHeader) {
    throw new AppError(404, 'This token does not exist');
  }

  try {
    const decoded = jwt.verify(
      token as string,
      config.jwt_access_secret as string,
    );

    if (!decoded) {
      throw new AppError(403, 'This user is not authorized');
    }

    req.user = decoded as JwtPayload;
    next();
  } catch (error: unknown) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AppError(401, 'Invalid or expired token');
    }

    next(error);
  }
};

export default auth;
