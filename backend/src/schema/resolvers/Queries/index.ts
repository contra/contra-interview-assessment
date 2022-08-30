import { resolve as getFeatureFlags } from './featureFlag';
import { getUserFeatureFlags, getUserFeatureFlagsByUser, getUserFeatureFlagsByFeatureFlag } from './userFeatureFlag';
import { resolve as getUsers } from './users';

export const Query = {
  getFeatureFlags,
  getUserFeatureFlags,
  getUserFeatureFlagsByFeatureFlag,
  getUserFeatureFlagsByUser,
  getUsers,

};
