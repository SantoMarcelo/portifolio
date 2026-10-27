import bcrypt from 'bcryptjs';
import type { User } from '@prisma/client';
import type { Role } from '../../constants';
import { prisma } from '../../prisma/client';
import { AppError } from '../../utils/app-error';
import { signToken } from '../../utils/jwt';
import type { LoginInput, RegisterInput } from './auth.schema';

export function toPublicUser(user: User) {
  return { id: user.id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt };
}

function issueSession(user: User) {
  const { token, expiresIn, expiresAt } = signToken({
    sub: user.id,
    email: user.email,
    role: user.role as Role,
  });
  return { token, expiresIn, expiresAt, user: toPublicUser(user) };
}

export async function register(input: RegisterInput) {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) throw AppError.conflict('EMAIL_ALREADY_EXISTS', 'Já existe um usuário com este e-mail');

  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      passwordHash: await bcrypt.hash(input.password, 8),
      role: 'CUSTOMER',
    },
  });
  return issueSession(user);
}

export async function login(input: LoginInput) {
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  const valid = user && (await bcrypt.compare(input.password, user.passwordHash));
  if (!user || !valid) throw AppError.unauthorized('INVALID_CREDENTIALS', 'E-mail ou senha inválidos');
  return issueSession(user);
}

export async function getProfile(userId: number) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw AppError.unauthorized('INVALID_TOKEN', 'Usuário não encontrado');
  return toPublicUser(user);
}
