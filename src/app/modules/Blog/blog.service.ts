import { Types } from 'mongoose';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
import { AppError } from '../../errors/AppErrors';
import { JWTuser } from '../../interface/error';
import { User } from '../User/user.model';

const createBlogInToDB = async (payload: TBlog) => {
  const result = await Blog.create(payload);
  return {
    _id: result._id,
    title: result.title,
    content: result.content,
    author: result.author,
  };
};
const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  // console.log('base query', query);

  const queryObj = { ...query };

  const blogSearchableFields = ['title'];
  let searchTerm = '';

  if (query.searchTerm) {
    searchTerm = query.searchTerm as string;
  }

  const searchQuery = Blog.find({
    $or: blogSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  const excludeField = ['search', 'sortBy', 'sortOrder'];
  excludeField.forEach((el) => delete queryObj[el]);

  // if (query?.filter) {
  //   const authorId = query.filter as string;
  //   if (Types.ObjectId.isValid(authorId)) {
  //     queryObj.author = new Types.ObjectId(authorId);
  //   } else {
  //     throw new Error('Invalid author ID');
  //   }
  // }

  const filterQuery = searchQuery.find(queryObj);

  const sortBy = (query?.sortBy as string) || 'createdAt';
  const sortOrder = query?.sortOrder === 'desc' ? -1 : 1;
  const sortedQuery = filterQuery.sort({ [sortBy]: sortOrder });

  return sortedQuery;
};
const getSingleBlogFromDB = async (id: string) => {
  const result = await Blog.findById(id).populate('author');
  return result;
};
const updateBlogInToDB = async (
  payload: Partial<TBlog>,
  PostID: string,
  user: JWTuser,
) => {
  const exitPost = await Blog.findById(PostID);
  if (!exitPost) {
    throw new AppError(404, 'This ID does not exist');
  }
  const authorID = exitPost.author.toString();
  const userID = user.userID.toString();
  if (authorID !== userID) {
    throw new AppError(403, 'This user is not authorized');
  }
  const result = await Blog.findByIdAndUpdate(PostID, payload, {
    new: true,
  }).populate('author', 'name email');
};
const deleteBlogFromDB = async (PostID: string, user: JWTuser) => {
  const exitPost = await Blog.findById(PostID);
  if (!exitPost) {
    throw new AppError(404, 'This ID does not exist');
  }
  const authorID = exitPost.author.toString();
  const findUser = await Blog.findById(authorID);
  const userID = user.userID.toString();
  if (authorID !== userID) {
    throw new AppError(
      403,
      `This user is not authorized. This post is owned by `,
    );
  }
  const result = await Blog.findByIdAndDelete(PostID);
  return result;
};

export const BlogService = {
  createBlogInToDB,
  getAllBlogsFromDB,
  getSingleBlogFromDB,
  updateBlogInToDB,
  deleteBlogFromDB,
};
