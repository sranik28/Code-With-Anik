import { CatchAsync } from '../../utils/CatchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { UserService } from './user.service';

const createUser = CatchAsync(async (req, res) => {
    const UserData = req.body;
  const result = await UserService.createUserIntoDB(UserData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
  });
});

const loginUser = CatchAsync(async (req, res) => {
    const UserData = req.body;
  const result = await UserService.userLoginInToDB(UserData);
  sendResponse(res, {
    statusCode: 200,
    message: 'User login successfully',
    success: true,
    data: result,
  });
});

export const UserControllers = {
  createUser,
  loginUser,
};