import { JWTuser } from '../../interface/error';
import { CatchAsync } from '../../utils/CatchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { AdminService } from './admin.service';

const adminUpdate = CatchAsync(async (req, res) => {
  const postID = req.params.userId;
  const user = req.user as JWTuser;

  const result = await AdminService.adminUpdateIntoDB(postID, user);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
  });
});

const adminDelete = CatchAsync(async (req, res) => {
  const payload = req.body;
  const user = req.user as JWTuser;
  const PostID = req.params.id;

  const result = await AdminService.adminDeleteFromDB(payload, user, PostID);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
  });
});

export const AdminControllers = {
  adminUpdate,
  adminDelete,
};
