import { Router } from 'express';
import { authRoutes } from './modules/auth/auth.routes';

export const v1Routes = Router();

v1Routes.use('/auth', authRoutes);
