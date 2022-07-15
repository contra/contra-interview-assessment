import { resolve as addFeatureFlag } from './addFeatureFlag';
import { resolve as addUser } from './addUser';
import { resolve as targetMultipleUsers } from './targetMultipleUsers';
import { resolve as targetSingleUser } from './targetSingleUser';

export const Mutation = {
  addFeatureFlag,
  addUser,
  targetMultipleUsers,
  targetSingleUser,
};
