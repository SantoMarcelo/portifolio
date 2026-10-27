import { describe, expect, it } from 'vitest';
import { registerSchema } from './auth.schema';

const valid = { name: 'Maria', email: 'Maria@Teste.com ', password: 'Senha@123' };

describe('registerSchema', () => {
  it('normaliza e-mail para minúsculas e sem espaços', () => {
    expect(registerSchema.parse(valid).email).toBe('maria@teste.com');
  });
  it.each([
    ['nome curto', { ...valid, name: 'M' }],
    ['e-mail inválido', { ...valid, email: 'abc' }],
    ['senha curta', { ...valid, password: '1234567' }],
  ])('rejeita %s', (_label, input) => {
    expect(registerSchema.safeParse(input).success).toBe(false);
  });
});
