import { Router } from 'express';
import { validate } from '../../middlewares/validate';
import { idParamSchema } from '../../utils/id-param';
import * as controller from './products.controller';
import {
  adminListProductsQuerySchema,
  createProductSchema,
  listProductsQuerySchema,
  updateProductSchema,
} from './products.schema';

/** Vitrine: público (visitante e CUSTOMER). Montado em /api/v1. */
export const publicProductRoutes = Router();
publicProductRoutes.get('/categories', controller.categories);
publicProductRoutes.get('/products', validate({ query: listProductsQuerySchema }), controller.listPublic);
publicProductRoutes.get('/products/:id', validate({ params: idParamSchema }), controller.getPublic);

/** Administração: montado em /api/v1/admin (já protegido por authenticate + requireRole). */
export const adminProductRoutes = Router();
adminProductRoutes.get('/products', validate({ query: adminListProductsQuerySchema }), controller.listAdmin);
adminProductRoutes.post('/products', validate({ body: createProductSchema }), controller.create);
adminProductRoutes.get('/products/:id', validate({ params: idParamSchema }), controller.getAdmin);
adminProductRoutes.put('/products/:id', validate({ params: idParamSchema, body: updateProductSchema }), controller.update);
adminProductRoutes.delete('/products/:id', validate({ params: idParamSchema }), controller.remove);
