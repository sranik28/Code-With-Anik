import { CatchAsync } from '../../utils/CatchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { BlogService } from './blog.service';

const createBlog = CatchAsync(async (req, res) => {
  const result = await BlogService.createBlogInToDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
  });
});

const getAllBlogs = CatchAsync(async (req, res) => {
  const result = await BlogService.getAllBlogsFromDB();
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

// const updateBlog = CatchAsync(async (req, res) => {
//   const result = await BlogService.updateBlogInToDB(req.params.id, req.body);
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     data: result,
//   });
// });

const deleteBlog = CatchAsync(async (req, res) => {
  const result = await BlogService.deleteBlogFromDB(req.params.id);
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
//   updateBlog,
  deleteBlog,
};
