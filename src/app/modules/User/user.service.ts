import config from '../../config';
import { AppError } from '../../errors/AppErrors';
import { TLoginUser, TUser } from './user.interface';
import { User } from './user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const userLoginInToDB = async (payload: TLoginUser) => {
  const isUserExist = await User.findOne({ _id: payload?.id });

  if (!isUserExist) {
    throw new AppError(404, 'User not found');
  }

  const isBlocked = isUserExist?.isBlocked;
  // console.log(isBlocked);
  if (isBlocked) {
    throw new AppError(400, 'User is blocked');
  }

  // checking if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    isUserExist?.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(400, 'Password is incorrect');
  }
  // console.log(isPasswordMatched);

  const jwtPayload = {
    _id: isUserExist._id,
    role: isUserExist.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '100d',
  });

  return accessToken;
};

export const UserService = {
  createUserIntoDB,
  userLoginInToDB,
};
