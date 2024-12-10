import express from 'express';
import {
  loginUser,
  logout,
  refreshSession,
  registerUser,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const router = express.Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUser),
);
router.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUser));
router.post('/refresh', ctrlWrapper(refreshSession));
router.post('/logout', ctrlWrapper(logout));

export default router;
