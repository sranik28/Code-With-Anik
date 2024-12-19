import { AppError } from '../../errors/AppErrors';
import { TLoginUser, TUser } from './user.interface';
import { User } from './user.model';

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
  console.log(isBlocked);
  if (isBlocked) {
    throw new AppError(400, 'User is blocked');
  }
};

export const UserService = {
  createUserIntoDB,
  userLoginInToDB,
};
