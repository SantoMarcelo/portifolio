import { describe, expect, it } from 'vitest';
import { round2 } from './money';

describe('round2', () => {
  it('evita erro de ponto flutuante', () => {
    expect(round2(0.1 + 0.2)).toBe(0.3);
    expect(round2(199.9 * 3)).toBe(599.7);
  });
  it('arredonda 3ª casa', () => expect(round2(1.005)).toBe(1.01));
});
