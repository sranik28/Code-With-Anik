import { Router } from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { BlogControllers } from './blog.controller';
import { auth } from '../../middlewares/Auth';
import { USER_ROLE } from '../User/user.constant';

const router = Router();

router.post('/',auth(USER_ROLE.user), BlogControllers.createBlog);
router.get('/',auth(USER_ROLE.user), BlogControllers.getAllBlogs);
router.get('/:id',auth(USER_ROLE.user), BlogControllers.getSingleBlog);


export const BlogRouters = router;
