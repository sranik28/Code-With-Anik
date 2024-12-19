import { Router } from 'express';
import { UserControllers } from './user.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = Router();

router.post('/register', UserControllers.createUser);
router.post(
  '/login',
  validateRequest(UserValidation.loginValidationSchema),
  UserControllers.loginUser,
);
export const UserRouters = router;
