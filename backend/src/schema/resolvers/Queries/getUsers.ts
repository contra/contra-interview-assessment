import { QueryResolvers } from '../../../generated/types';
import { UserService } from '../../../services/userService';

export const getUsers: QueryResolvers['getUsers'] = async (
  _parent,
  _args,
  { db },
) => {
  const users = await new UserService(db).findAllUsers();

  return users;
};
