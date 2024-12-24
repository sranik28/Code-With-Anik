import { JWTuser } from '../../interface/error';
import { CatchAsync } from '../../utils/CatchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { BlogService } from './blog.service';

const createBlog = CatchAsync(async (req, res) => {
  const body = req.body;

  const result = await BlogService.createBlogInToDB(body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
  });
});

const getAllBlogs = CatchAsync(async (req, res) => {
  const result = await BlogService.getAllBlogsFromDB(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
  });
});

const getSingleBlog = CatchAsync(async (req, res) => {
  const result = await BlogService.getSingleBlogFromDB(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
  });
});

const updateBlog = CatchAsync(async (req, res) => {
  const payload = req.body;
  const PostID = req.params.id;
  const user = req.user as JWTuser;
  const result = await BlogService.updateBlogInToDB(payload, PostID, user);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
  });
});

const deleteBlog = CatchAsync(async (req, res) => {
  const PostID = req.params.id;
  const user = req.user as JWTuser;
  const result = await BlogService.deleteBlogFromDB(PostID, user);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
  });
});

export const BlogControllers = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
    updateBlog,
  deleteBlog,
};
