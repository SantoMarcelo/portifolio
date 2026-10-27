import { z } from 'zod';

export const tokenSchema = z.object({
  email: z.string().trim().toLowerCase().email().default('cliente@loja.com'),
  // Negativo ou zero gera um token já expirado. Padrão: -60 (expirado há 1 minuto).
  expiresInSeconds: z.number().int().default(-60),
});
