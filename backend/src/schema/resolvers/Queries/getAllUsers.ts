import { sql } from 'slonik';
import { QueryResolvers, User } from '../../../generated/types';

export const resolve: QueryResolvers['getAllUsers'] = async (
  _parent,
  _args,
  { pool },
) => {
  const users = (await pool.many(
    sql`SELECT id, given_name as "givenName", family_name as "familyName", email_address as email from public.user_account`,
  )) as User[];
  return users;
};
