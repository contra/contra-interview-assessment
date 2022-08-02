import { UserAccountPersistence } from '../UserAccountPersistence';
import { QueryResolvers } from '../../../generated/types';

export const resolve: QueryResolvers['getAllUsers'] = async (
  _parent,
  _args,
  { pool },
) => {
  return await UserAccountPersistence.doesFeatureFlagExist(pool);
};
