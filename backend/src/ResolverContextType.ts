import { PrismaClient } from '.prisma/client';

export type ResolverContext = {
  readonly db: PrismaClient;
};
