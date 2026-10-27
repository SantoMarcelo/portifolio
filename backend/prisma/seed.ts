import { prisma } from '../src/prisma/client';
import { seedDatabase } from '../src/prisma/seed-data';

seedDatabase(prisma)
  .then(() => console.log('Seed concluído'))
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
