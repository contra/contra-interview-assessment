import { resolve as getFeatureFlags } from './featureFlag';
import { resolve as getUserFeatureFlags } from './userFeatureFlag';
import { resolve as hello } from './hello';
import { resolve as getUsers } from './users';

export const Query = {
  getFeatureFlags,
  getUserFeatureFlags,
  getUsers,
  hello,

};
