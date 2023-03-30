import { QueryResolvers } from '../../../generated/types';

export const getFeatureFlags: QueryResolvers['getFeatureFlags'] = async (
  _parent,
  _args,
  { db: prisma },
) => {
  const featureFlags = await prisma.featureFlag.findMany();

  return featureFlags;
};
