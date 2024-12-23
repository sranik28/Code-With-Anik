import { Types } from 'mongoose';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
import { AppError } from '../../errors/AppErrors';

const createBlogInToDB = async (payload: TBlog) => {
  const result = await Blog.create(payload);
  return result;
};
const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const result = await Blog.find(query).populate('author');
  return result;

  
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
