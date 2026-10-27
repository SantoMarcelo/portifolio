import type { Role } from '../../constants';
import { prisma } from '../../prisma/client';
import { clearDatabase, seedDatabase } from '../../prisma/seed-data';
import { AppError } from '../../utils/app-error';
import { signToken } from '../../utils/jwt';

export async function reset() {
  await clearDatabase(prisma);
  await seedDatabase(prisma);
}

export async function seed() {
  await seedDatabase(prisma);
}

export async function issueToken(email: string, expiresInSeconds: number) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw AppError.notFound('Usuário não encontrado', 'USER_NOT_FOUND');
  return signToken({ sub: user.id, email: user.email, role: user.role as Role }, expiresInSeconds);
}
