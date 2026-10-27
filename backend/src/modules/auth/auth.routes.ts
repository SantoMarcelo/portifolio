import { Router } from 'express';
import { authenticate } from '../../middlewares/auth';
import { validate } from '../../middlewares/validate';
import * as controller from './auth.controller';
import { loginSchema, registerSchema } from './auth.schema';

export const authRoutes = Router();

authRoutes.post('/register', validate({ body: registerSchema }), controller.register);
authRoutes.post('/login', validate({ body: loginSchema }), controller.login);
authRoutes.post('/logout', authenticate, controller.logout);
authRoutes.get('/me', authenticate, controller.me);
