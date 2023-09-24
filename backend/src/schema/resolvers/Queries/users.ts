import { getAllUsers } from '../../../data/users';
import { QueryResolvers } from '../../../generated/types';
import { parseUserModel } from '../../../helpers/graphql';

export const queryUsers: QueryResolvers['users'] = async (
  _parent,
  _args,
  { pool },
) => {
  const users = await getAllUsers(pool);

  return users.map(parseUserModel);
};
