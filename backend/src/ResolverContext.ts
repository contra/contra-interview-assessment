import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export type ResolverContext = {
  prisma: PrismaClient;
};

export const createContext = (): ResolverContext => {
  return {
    prisma,
  };
};
