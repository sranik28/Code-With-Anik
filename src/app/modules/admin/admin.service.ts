import { AppError } from '../../errors/AppErrors';
import { JWTuser } from '../../interface/error';
import { TBlog } from '../Blog/blog.interface';
import { Blog } from '../Blog/blog.model';
import { User } from '../User/user.model';

const adminUpdateIntoDB = async (PostID: string, user: JWTuser) => {
  const exitPost = await User.findById(PostID);
  if (!exitPost) {
    throw new AppError(404, 'This ID does not exist');
  }

  if (user.role !== 'admin') {
    throw new AppError(403, 'This user is not an admin');
  }
  const result = await User.findByIdAndUpdate(
    PostID,
    { isBlocked: true },
    { new: true },
  );
  return result;
};

const adminDeleteFromDB = async (
  payload: Partial<TBlog>,
  user: JWTuser,
  PostID: string,
) => {
    const exitPost = await Blog.findById(PostID);
    if (!exitPost) {
      throw new AppError(404, 'This ID does not exist');
    }
  
    if (user.role !== 'admin') {
      throw new AppError(403, 'This user is not an admin');
    }
    const result = await Blog.findByIdAndDelete(PostID);
    return result;
};

export const AdminService = {
  adminUpdateIntoDB,
  adminDeleteFromDB,
};
