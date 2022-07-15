import { sql } from 'slonik';
import { getUpdateFeatureFlagAssignmentQuery, processUserRow } from '../db';
import { MutationResolvers } from '../../../generated/types';

export const resolve: MutationResolvers['targetSingleUser'] = async (
  _parent,
  _args,
  { pool },
) => {
  const getUserQuery = sql`SELECT (id, given_name, family_name, email_address, feature_flag_assignments, created_at, updated_at) FROM users WHERE id = ${_args.input.userId}`;
  const user = processUserRow((await pool.query(getUserQuery)).rows[0]); // get the user specified by the input ID
  const updateUserQuery = getUpdateFeatureFlagAssignmentQuery(user, String(_args.input.flagId), _args.input.value, _args.input.valueType);

  if (updateUserQuery) { // execute the UPDATE statement, and return the updated user
    return processUserRow((await pool.query(updateUserQuery)).rows[0]);
  } else { // return the user as-is if no UPDATE statement was created
    return user;
  }
};
