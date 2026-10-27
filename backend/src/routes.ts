import { Router } from 'express';
import { authenticate } from './middlewares/auth';
import { requireRole } from './middlewares/role';
import { authRoutes } from './modules/auth/auth.routes';
import { cartRoutes } from './modules/cart/cart.routes';
import { adminDashboardRoutes } from './modules/dashboard/dashboard.routes';
import { adminOrderRoutes, checkoutRoutes, customerOrderRoutes } from './modules/orders/orders.routes';
import { adminProductRoutes, publicProductRoutes } from './modules/products/products.routes';
import { adminStockRoutes } from './modules/stock/stock.routes';

export const v1Routes = Router();

v1Routes.use('/auth', authRoutes);
v1Routes.use(publicProductRoutes);
v1Routes.use('/cart', cartRoutes);
v1Routes.use('/checkout', checkoutRoutes);
v1Routes.use('/orders', customerOrderRoutes);

// Tudo em /admin exige token (401) e papel ADMIN (403)
const adminRoutes = Router();
adminRoutes.use(authenticate, requireRole('ADMIN'));
adminRoutes.use(adminProductRoutes);
adminRoutes.use(adminStockRoutes);
adminRoutes.use(adminOrderRoutes);
adminRoutes.use(adminDashboardRoutes);
v1Routes.use('/admin', adminRoutes);
