import { QueryResolvers } from '../../../generated/types';
import { sql } from 'slonik';

const Query: QueryResolvers = {
  allUsersWithFeatureFlags: async ( _parent,
    _args,
    context,
  ) => {
    const { pool } = context;
      // Your SQL query using the `sql` tagged template literal
  const users = await pool.any(
    sql`
    SELECT
    u.id AS id,
    u.given_name,
    u.family_name,
    u.email_address,
    a.user_id AS userId,
    a.feature_flag_id AS featureFlagId,
    a.value AS featureFlagAssignmentValue
FROM
    user_account u
LEFT JOIN
    feature_flag_assignments a ON u.id = a.user_id
ORDER BY
    u.id;
    `,
  );


  for(let user of users) {
    user.featureflag = {
      userId: user.id,
      featureFlagId: user.featureflagid,
      value: user.featureflagassignmentvalue
    }
    }

  return users || [];
  }
}

export default Query