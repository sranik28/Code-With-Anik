import { Router } from 'express';
import { UserRouters } from '../modules/User/user.router';
import { BlogRouters } from '../modules/Blog/blog.router';
import { AdminRouters } from '../modules/admin/admin.router';


const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRouters,
  },
  {
    path: '/blogs',
    route: BlogRouters,
  },
  {
    path: '/admin',
    route: AdminRouters,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
