// import { NextFunction, Request, Response } from 'express';
// import { TUserRole } from '../modules/User/user.interface';
// import { CatchAsync } from '../utils/CatchAsync';
// import { AppError } from '../errors/AppErrors';

// export const auth = (...requiredRoles: TUserRole[]) => {
//   return CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const token = req.headers.authorization;
//     if (!token) {
//       throw new AppError(401, 'You are not logged in');
//     }
//   });
// };

import config from '../config';
import { AppError } from '../errors/AppErrors';
import { TUserRole } from '../modules/User/user.interface';
import { User } from '../modules/User/user.model';
import { CatchAsync } from '../utils/CatchAsync';
import jwt, { decode, JwtPayload } from 'jsonwebtoken';

const auth = (requireRoles: any) => {
  return CatchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error('You are not Authorized!');
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
    const { role, email,name } = decoded;

    // const { email, role, name } = decoded;
    console.log("sdf",name);

    // const user = await User.findOne({ email });
    // if (!user) {
    //   throw new Error('User not found!');
    // }
    console.log(requireRoles, role);

    if (requireRoles && !requireRoles.includes(role)) {
      throw new Error('Your role not match so, You are not Authorized!');
    }

    next();
  });
};

export default auth;
