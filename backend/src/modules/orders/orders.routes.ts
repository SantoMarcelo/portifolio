import { Router } from 'express';
import { authenticate } from '../../middlewares/auth';
import { requireRole } from '../../middlewares/role';
import { validate } from '../../middlewares/validate';
import { idParamSchema } from '../../utils/id-param';
import * as controller from './orders.controller';
import { createOrderSchema, listOrdersQuerySchema, quoteSchema } from './orders.schema';

/** Montado em /api/v1/checkout (CUSTOMER). */
export const checkoutRoutes = Router();
checkoutRoutes.use(authenticate, requireRole('CUSTOMER'));
checkoutRoutes.post('/quote', validate({ body: quoteSchema }), controller.quote);

/** Montado em /api/v1/orders (CUSTOMER). */
export const customerOrderRoutes = Router();
customerOrderRoutes.use(authenticate, requireRole('CUSTOMER'));
customerOrderRoutes.post('/', validate({ body: createOrderSchema }), controller.create);
customerOrderRoutes.get('/', validate({ query: listOrdersQuerySchema }), controller.listMine);
customerOrderRoutes.get('/:id', validate({ params: idParamSchema }), controller.getMine);
customerOrderRoutes.post('/:id/cancel', validate({ params: idParamSchema }), controller.cancelMine);

/** Montado em /api/v1/admin (já protegido por ADMIN). */
export const adminOrderRoutes = Router();
adminOrderRoutes.get('/orders', validate({ query: listOrdersQuerySchema }), controller.listAll);
adminOrderRoutes.get('/orders/:id', validate({ params: idParamSchema }), controller.getAny);
adminOrderRoutes.post('/orders/:id/cancel', validate({ params: idParamSchema }), controller.cancelAny);
