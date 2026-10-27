import { describe, expect, it } from 'vitest';
import { assertQuantityAvailable, findStockProblems } from './cart.service';

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

describe('findStockProblems', () => {
  const line = { productId: 1, name: 'Mouse', quantity: 2, stock: 5, available: true };
  it('carrinho todo disponível → sem problemas', () => {
    expect(findStockProblems([line])).toEqual([]);
  });
  it('lista apenas itens indisponíveis com estoque e quantidade pedida', () => {
    const bad = { ...line, productId: 2, name: 'Webcam', quantity: 3, stock: 1, available: false };
    expect(findStockProblems([line, bad])).toEqual([{ productId: 2, name: 'Webcam', available: 1, requested: 3 }]);
  });
  it('produto inativo com estoque aparece como indisponível', () => {
    const inactive = { ...line, available: false };
    expect(findStockProblems([inactive])).toEqual([{ productId: 1, name: 'Mouse', available: 5, requested: 2 }]);
  });
});
