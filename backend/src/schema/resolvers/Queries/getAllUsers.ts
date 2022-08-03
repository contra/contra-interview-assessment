import { UserAccountPersistence } from '../UserAccountPersistence';
import { QueryResolvers } from '../../../generated/types';
import { DEFAULT_SKIP, DEFAULT_LIMIT } from '../../../constants';

export const resolve: QueryResolvers['getAllUsers'] = async (
  _parent,
  { skip, limit },
  { pool },
) => {
  skip = skip ? skip : DEFAULT_SKIP;
  limit = limit ? limit : DEFAULT_LIMIT;
  return await UserAccountPersistence.getAllUsers(pool, skip, limit);
};
