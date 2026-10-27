import { describe, expect, it } from 'vitest';
import { assertQuantityAvailable } from './cart.service';

describe('assertQuantityAvailable', () => {
  it('aceita quantidade igual ao estoque', () => {
    expect(() => assertQuantityAvailable(3, 3)).not.toThrow();
  });
  it('estoque 0 → OUT_OF_STOCK', () => {
    expect(() => assertQuantityAvailable(0, 1)).toThrowError(expect.objectContaining({ status: 409, code: 'OUT_OF_STOCK' }));
  });
  it('quantidade acima do estoque → INSUFFICIENT_STOCK', () => {
    expect(() => assertQuantityAvailable(3, 4, 2)).toThrowError(
      expect.objectContaining({ status: 409, code: 'INSUFFICIENT_STOCK' }),
    );
  });
});
