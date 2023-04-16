import { QueryResolvers } from '../../../generated/types';

export const resolve: QueryResolvers['users'] = async (
  _parent,
  _args,
  { prisma },
) => {
  return await prisma.user.findMany({
    include: { featureFlags: true },
  });
};
