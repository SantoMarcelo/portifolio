import { describe, expect, it } from 'vitest';
import { loginSchema, registerSchema } from './auth.schema';

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

describe('loginSchema', () => {
  const login = { email: 'Maria@Teste.com ', password: 'Senha@123' };
  it('aceita senha de 8 e 72 caracteres', () => {
    expect(loginSchema.safeParse(login).success).toBe(true);
    expect(loginSchema.safeParse({ ...login, password: 'a'.repeat(72) }).success).toBe(true);
  });
  it.each([
    ['senha vazia', ''],
    ['senha com 7 caracteres', '1234567'],
    ['senha com 73 caracteres', 'a'.repeat(73)],
  ])('rejeita %s', (_label, password) => {
    expect(loginSchema.safeParse({ ...login, password }).success).toBe(false);
  });
});
