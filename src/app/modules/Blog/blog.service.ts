import { Types } from 'mongoose';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
import { AppError } from '../../errors/AppErrors';
import auth from '../../middlewares/Auth';

const createBlogInToDB = async (payload: TBlog) => {
  const result = await Blog.create(payload);
  return result;
};
const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  console.log('base query', query);

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
const updateBlogInToDB = async () => {
  const result = await Blog.find({});
  return result;
};
const deleteBlogFromDB = async (id: string) => {
  const result = await Blog.findById(id);
  return result;
};

export const BlogService = {
  createBlogInToDB,
  getAllBlogsFromDB,
  getSingleBlogFromDB,
  updateBlogInToDB,
  deleteBlogFromDB,
};
