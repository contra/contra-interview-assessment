import { sql } from 'slonik';
import { QueryResolvers, User } from '../../../generated/types';

export const users: QueryResolvers['users'] = async (
  _parent,
  { environment },
  { pool },
) => {
  
  return pool.any<User>(
    sql`SELECT id, given_name, family_name, email_address, created_at, updated_at, ${environment} as environment FROM user_account;`
  );

};
