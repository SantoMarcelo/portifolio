import { Router } from 'express';
import { validate } from '../../middlewares/validate';
import { idParamSchema } from '../../utils/id-param';
import * as controller from './stock.controller';
import { movementsQuerySchema, stockAdjustSchema } from './stock.schema';

/** Montado em /api/v1/admin. */
export const adminStockRoutes = Router();
adminStockRoutes.post('/products/:id/stock', validate({ params: idParamSchema, body: stockAdjustSchema }), controller.adjust);
adminStockRoutes.get('/stock/movements', validate({ query: movementsQuerySchema }), controller.movements);
