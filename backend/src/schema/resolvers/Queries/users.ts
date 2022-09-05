import { User, QueryResolvers } from '../../../generated/types';

export const resolve: QueryResolvers['users'] = async (
  _parent,
  _args,
  { datasources },
): Promise<User[]> => {
  return datasources.userDatasource.getUsers();
};
