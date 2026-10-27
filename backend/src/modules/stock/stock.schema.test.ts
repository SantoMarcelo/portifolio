import { describe, expect, it } from 'vitest';
import { stockAdjustSchema } from './stock.schema';

const base = { reason: 'Contagem física' };

describe('stockAdjustSchema', () => {
  it.each([
    ['entrada válida', { type: 'ENTRY', quantity: 3, ...base }, true],
    ['entrada com 0', { type: 'ENTRY', quantity: 0, ...base }, false],
    ['saída negativa', { type: 'EXIT', quantity: -1, ...base }, false],
    ['ajuste para 0', { type: 'ADJUSTMENT', quantity: 0, ...base }, true],
    ['ajuste negativo', { type: 'ADJUSTMENT', quantity: -2, ...base }, false],
    ['quantidade decimal', { type: 'ENTRY', quantity: 1.5, ...base }, false],
    ['sem motivo', { type: 'ENTRY', quantity: 1 }, false],
    ['tipo inválido', { type: 'FOO', quantity: 1, ...base }, false],
  ])('%s', (_l, input, ok) => {
    expect(stockAdjustSchema.safeParse(input).success).toBe(ok);
  });
});
