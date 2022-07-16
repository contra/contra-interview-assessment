import { sql } from 'slonik';
import { processUserRow } from '../db';
import { MutationResolvers } from '../../../generated/types';

export const resolve: MutationResolvers['addUser'] = async(
  _parent,
  _args,
  { pool }
) => {
  const addUserQuery = sql`INSERT INTO users (given_name, family_name, email_address)
    VALUES (${_args.input.givenName}, ${_args.input.familyName}, ${_args.input.emailAddress})
    RETURNING (id, given_name, family_name, email_address, feature_flag_assignments, created_at, updated_at)`;

  // execute the INSERT statement, and return the newly created user
  return processUserRow((await pool.query(addUserQuery)).rows[0]);
};
