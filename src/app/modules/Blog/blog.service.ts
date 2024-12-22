import { Types } from 'mongoose';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
import { AppError } from '../../errors/AppErrors';

const createBlogInToDB = async (payload: TBlog) => {
  const result = await Blog.create(payload);
  return result;
};
const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };
  const searchableFields = ['title'];

  let search = '';
  if (query?.search) {
    search = query?.search as string;
  }

  if (query?.filter) {
    const authorId = query.filter as string;
    if (Types.ObjectId.isValid(authorId)) {
      queryObj.author = new Types.ObjectId(authorId);
    } else {
      throw new AppError(400, 'Invalid author ID');
    }
  }

  const searchQuery = Blog.find({
    $or: searchableFields.map((field) => ({
      [field]: { $regex: search, $options: 'i' },
    })),
  });

  const excludeField = ['search', 'sortBy', 'sortOrder', 'filter'];
  excludeField.forEach((el) => delete queryObj[el]);

  const filterQuery = searchQuery.find(queryObj);

  let sortBy = '-createdAt';
  if (query.sortBy) {
    sortBy = query.sortBy as string;
  }

  let sortOrder = -1;
  if (query.sortOrder && query.sortOrder === 'asc') {
    sortOrder = 1;
  }

  const sortQuery = filterQuery.sort({
    [sortBy]: sortOrder as 1 | -1,
  });

  return sortQuery;

  
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
