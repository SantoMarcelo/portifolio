import { describe, expect, it } from 'vitest';
import { createProductSchema } from './products.schema';

const valid = { name: 'Produto X', price: 10.5, sku: 'X-1', category: 'Casa', stock: 0 };
const ok = (o: object) => createProductSchema.safeParse({ ...valid, ...o }).success;

describe('createProductSchema', () => {
  it('aceita produto válido', () => expect(ok({})).toBe(true));
  it('nome: 3 a 100 caracteres', () => {
    expect(ok({ name: 'ab' })).toBe(false);
    expect(ok({ name: 'abc' })).toBe(true);
    expect(ok({ name: 'a'.repeat(100) })).toBe(true);
    expect(ok({ name: 'a'.repeat(101) })).toBe(false);
  });
  it('preço deve ser > 0 e ter até 2 casas', () => {
    expect(ok({ price: 0 })).toBe(false);
    expect(ok({ price: -1 })).toBe(false);
    expect(ok({ price: 1.999 })).toBe(false);
    expect(ok({ price: 0.01 })).toBe(true);
  });
  it('estoque inteiro >= 0', () => {
    expect(ok({ stock: -1 })).toBe(false);
    expect(ok({ stock: 1.5 })).toBe(false);
    expect(ok({ stock: 7 })).toBe(true);
  });
});
