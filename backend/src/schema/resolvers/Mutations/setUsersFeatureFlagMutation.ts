import { MutationResolvers } from '../../../generated/types';

export const resolve: MutationResolvers['setUsersFeatureFlagMutation'] = (
  _parent,
  { userIds, featureFlagKey, featureFlagValue },
  { datasources },
) => {
  return datasources.userFeatureFlagDatasource.setUsersFeatureFlag(
    userIds,
    featureFlagKey,
    featureFlagValue,
  );
};
