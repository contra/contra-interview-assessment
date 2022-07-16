import { sql } from 'slonik';
import { processUserRows } from '../db';
import { QueryResolvers } from '../../../generated/types';

export const resolve: QueryResolvers['users'] = async (
  _parent,
  _args,
  { pool },
) => {
  const getUsersQuery = sql`SELECT (id, given_name, family_name, email_address, feature_flag_assignments, created_at, updated_at) FROM users`;
  return processUserRows((await pool.query(getUsersQuery)).rows) // execute the SELECT statement, and return a list of all users
};
