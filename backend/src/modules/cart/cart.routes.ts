import { Router } from 'express';
import { authenticate } from '../../middlewares/auth';
import { requireRole } from '../../middlewares/role';
import { validate } from '../../middlewares/validate';
import * as controller from './cart.controller';
import { addItemSchema, productIdParamSchema, updateItemSchema } from './cart.schema';

/** Carrinho: somente CUSTOMER logado. Montado em /api/v1/cart. */
export const cartRoutes = Router();
cartRoutes.use(authenticate, requireRole('CUSTOMER'));

cartRoutes.get('/', controller.get);
cartRoutes.delete('/', controller.clear);
cartRoutes.post('/items', validate({ body: addItemSchema }), controller.addItem);
cartRoutes.patch('/items/:productId', validate({ params: productIdParamSchema, body: updateItemSchema }), controller.updateItem);
cartRoutes.delete('/items/:productId', validate({ params: productIdParamSchema }), controller.removeItem);
