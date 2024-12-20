import { NextFunction, Request, Response } from 'express';
import { TUserRole } from '../modules/User/user.interface';
import { CatchAsync } from '../utils/CatchAsync';
import { AppError } from '../errors/AppErrors';

export const auth = (...requiredRoles: TUserRole[]) => {
  return CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(401, 'Token not found');
    }
  });
};


