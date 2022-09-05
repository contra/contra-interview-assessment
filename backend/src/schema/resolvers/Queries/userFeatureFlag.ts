import { UserFeatureFlag, UserResolvers } from '../../../generated/types';

export const resolve: UserResolvers['featureFlags'] = async (
  { userId },
  _args,
  { datasources },
): Promise<UserFeatureFlag[]> => {
  return await datasources.userFeatureFlagDatasource.getUserFeatureFlags.load(
    userId,
  );
};
