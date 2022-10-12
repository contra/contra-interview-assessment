import { resolve as userFeatureFlagResolver } from './userFeatureFlag';
import { resolve as usersResolver } from './users';

export const Query = {
  users: usersResolver,
};

export const User = {
  featureFlags: userFeatureFlagResolver,
};
