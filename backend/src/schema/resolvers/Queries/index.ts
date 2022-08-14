import { resolve as hello } from './hello';
import { resolveAllUsers as getAllUsers } from './userQueries';

export const Query = {
  getAllUsers,
  hello,
};
