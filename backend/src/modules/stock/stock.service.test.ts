import { describe, expect, it } from 'vitest';
import { computeNewStock } from './stock.service';

describe('computeNewStock', () => {
  it('entrada soma', () => expect(computeNewStock(5, 'ENTRY', 10)).toBe(15));
  it('saída subtrai', () => expect(computeNewStock(5, 'EXIT', 5)).toBe(0));
  it('ajuste define valor absoluto', () => expect(computeNewStock(5, 'ADJUSTMENT', 42)).toBe(42));
  it('ajuste para zero é permitido', () => expect(computeNewStock(5, 'ADJUSTMENT', 0)).toBe(0));
  it('saída maior que o estoque falha com INSUFFICIENT_STOCK', () => {
    expect(() => computeNewStock(3, 'EXIT', 4)).toThrowError(
      expect.objectContaining({ status: 409, code: 'INSUFFICIENT_STOCK' }),
    );
  });
});
