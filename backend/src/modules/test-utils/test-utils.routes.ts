import { Router } from 'express';
import { validate } from '../../middlewares/validate';
import * as controller from './test-utils.controller';
import { tokenSchema } from './test-utils.schema';

/** Montado somente quando NODE_ENV !== 'production'. */
export const testUtilsRoutes = Router();

testUtilsRoutes.post('/reset', controller.reset);
testUtilsRoutes.post('/seed', controller.seed);
testUtilsRoutes.post('/token', validate({ body: tokenSchema }), controller.token);
testUtilsRoutes.post('/expired-token', validate({ body: tokenSchema.pick({ email: true }) }), controller.expiredToken);
