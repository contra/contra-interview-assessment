import { PrismaClient } from '.prisma/client';

export type ResolverContext = {
  readonly pool: PrismaClient;
};
