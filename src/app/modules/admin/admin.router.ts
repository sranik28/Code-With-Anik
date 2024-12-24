import { Router } from 'express';
import { AdminControllers } from './admin.controller';
import  auth  from '../../middlewares/auth';

const router = Router();

router.delete('/blogs/:id', auth, AdminControllers.adminDelete);

router.patch('/users/:userId/block', auth, AdminControllers.adminUpdate);

export const AdminRouters = router;
