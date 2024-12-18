import { Router } from 'express';
import { UserRouters } from '../modules/User.router';

const router = Router();

const moduleRoutes = [
  {
    path: '/',
    route: UserRouters,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
