import { User, QueryResolvers } from '../../../generated/types';
import { UserService } from '../../../services/userService';

export const users: QueryResolvers['users'] = async () => {
  const userService = new UserService();
  const result = await userService.getUsers();

  return (result as unknown) as User[];
};

// @ts-ignore
export const user: QueryResolvers['user'] = async (
  _: never,
  args: { id: string },
) => {
  const userService = new UserService();
  const result = await userService.getUserById(args.id);

  return (result as unknown) as User;
};

export const usersWithFeatureFlags: QueryResolvers['usersWithFeatureFlags'] = async () => {
  const userService = new UserService();
  const result = await userService.getUsersWithFeatureFlag();

  return (result as unknown) as User[];
};
