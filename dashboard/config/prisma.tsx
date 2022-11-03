import { Prisma, PrismaClient } from '@prisma/client/edge';

let prisma: PrismaClient;

// NOTE: Prevent multiple instances of Prisma Client in development
declare const global: Global & { prisma?: PrismaClient };

const opts: Prisma.Subset<Prisma.PrismaClientOptions, Prisma.PrismaClientOptions> = {
  log: ['error', 'info', 'query', 'warn'],
}

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient(opts);
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient(opts);
  }
  prisma = global.prisma;
}

export default prisma;