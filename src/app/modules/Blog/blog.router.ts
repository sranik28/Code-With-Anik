import { Router } from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { BlogControllers } from './blog.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { BlogValidation } from './blog.validation';

const router = Router();

router.post(
  '/',
  // auth([USER_ROLE.user]),
  validateRequest(BlogValidation.BlogValidationSchema),
  BlogControllers.createBlog,
);
router.get('/', auth, BlogControllers.getAllBlogs);
router.get('/:id', auth, BlogControllers.getSingleBlog);
router.patch(
  '/:id',
  auth,
  validateRequest(BlogValidation.BlogValidationSchema),
  BlogControllers.updateBlog,
);
router.delete('/:id', auth, BlogControllers.deleteBlog);
router.patch(
  '/admin/users/:userId/block',
  auth,
  BlogControllers.deleteBlog,
);

export const BlogRouters = router;
