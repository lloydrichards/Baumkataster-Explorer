import { PrismaClient } from '@prisma/client/edge';

let prisma: PrismaClient;

// NOTE: Prevent multiple instances of Prisma Client in development
declare const global: Global & { prisma?: PrismaClient };


if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;