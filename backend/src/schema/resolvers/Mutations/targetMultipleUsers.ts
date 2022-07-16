import { sql } from 'slonik';
import { getUpdateFeatureFlagAssignmentQuery, processUserRow, processUserRows, } from '../db';
import { MutationResolvers, User } from '../../../generated/types';

export const resolve: MutationResolvers['targetMultipleUsers'] = async(
  _parent,
  _args,
  { pool }
) => {
  const getUsersQuery = sql`SELECT (id, given_name, family_name, email_address, feature_flag_assignments, created_at, updated_at)
    FROM users WHERE id = ANY(${sql.array(_args.input.userIds.join(',').split(','), 'int4')})`;

  let users: User[] = [];
  processUserRows((await pool.query(getUsersQuery)).rows).forEach(async user => { // foreach user ID in the input list
    const updateUserQuery = getUpdateFeatureFlagAssignmentQuery(user, String(_args.input.flagId), _args.input.value, _args.input.valueType); // create UPDATE statement for current user if needed

    if (updateUserQuery) { // execute the UPDATE statement, and push the updated user to list of return values
      users.push(processUserRow((await pool.query(updateUserQuery)).rows[0]));
    } else { // add the user to the list of return values as-is if no UPDATE statement was created
      users.push(user);
    }
  });

  return users;
};
