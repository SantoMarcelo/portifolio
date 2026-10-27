import { z } from 'zod';

export const idParamSchema = z.object({
  id: z.coerce.number('ID deve ser numérico').int('ID deve ser inteiro').positive('ID deve ser positivo'),
});
