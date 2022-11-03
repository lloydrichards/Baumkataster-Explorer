import { Prisma, PrismaClient } from '@prisma/client/edge';

let prisma: PrismaClient;

// NOTE: Prevent multiple instances of Prisma Client in development
declare const global: Global & { prisma?: PrismaClient };

const devOpts: Prisma.Subset<
  Prisma.PrismaClientOptions,
  Prisma.PrismaClientOptions
> = {
  log: ['error', 'info', 'query', 'warn'],
};
const prodOpts: Prisma.Subset<
  Prisma.PrismaClientOptions,
  Prisma.PrismaClientOptions
> = {
  log: ['error'],
};

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient(prodOpts);
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient(devOpts);
  }
  prisma = global.prisma;
}

export default prisma;
