import { Router } from 'express';
import { UserRouters } from '../modules/User/user.router';


const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRouters,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
