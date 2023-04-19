import { resolve as sampleMutation } from './sampleMutation';
import { resolve as createFeatureFlags } from './createFeatureFlags';
import { resolve as createUserAccounts } from './createUserAccounts';
import { resolve as createUserFlags } from './createUserFlags';
import { resolve as setUserFeature } from './setUserFeature';
import { resolve as setFeatureFlag } from './setFeatureFlag';


export const Mutation = {
  sampleMutation,
  createFeatureFlags,
  createUserAccounts,
  createUserFlags,
  setUserFeature,
  setFeatureFlag
};
