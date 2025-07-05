import { join } from 'path';
import { PrismaClient } from './libs/prisma/generated/prisma';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'dev' ? ['query', 'error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export const PRISMA_SCHEMA_PATH =
  process.env.PRISMA_SCHEMA_PATH ||
  join(__dirname, 'libs', 'prisma', 'prisma', 'schema.prisma');
