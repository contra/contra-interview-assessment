import { getUser } from '../../../data/users';
import { QueryResolvers } from '../../../generated/types';
import { parseUserModel } from '../../../helpers/graphql';

export const queryUser: QueryResolvers['user'] = async (
  _parent,
  args,
  { pool },
) => {
  const { userId } = args;

  const user = await getUser(pool, userId);

  return parseUserModel(user);
};
