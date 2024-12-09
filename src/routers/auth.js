import { Router } from 'express';
import {
  loginUser,
  logout,
  refreshSession,
  registerUser,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';

const router = Router();

router.post('/register', validateBody(registerUserSchema), registerUser);
router.post('/login', validateBody(loginUserSchema), loginUser);
router.post('/refresh', refreshSession);
router.post('/logout', logout);

export default router;
