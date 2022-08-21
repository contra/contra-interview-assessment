import { FeatureFlagUserValue, UserResolvers } from '../../../generated/types';

export const resolve: UserResolvers['featureFlags'] = async (
  { userId },
  _args,
  { loaders },
): Promise<FeatureFlagUserValue[]> => {
  return await loaders.userFeatureFlagLoader.load(userId);
};
