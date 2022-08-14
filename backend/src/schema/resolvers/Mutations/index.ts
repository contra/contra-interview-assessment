import { resolve as sampleMutation } from './sampleMutation';
import { resolveCreateUser as createUser, resolveSetUserFeatureFlag as setUserFeatureFlag, resolveSetUsersBasedOnFeatureFlag as setUsersBasedOnFeatureFlag } from './userMutations';

export const Mutation = {
  createUser,
  sampleMutation,
  setUserFeatureFlag,
  setUsersBasedOnFeatureFlag
};
