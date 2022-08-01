import { sql } from 'slonik';
import { MutationResolvers } from '../../../generated/types';

// @ts-ignore
export const resolve: MutationResolvers['updateUserAccounts'] = async (
  _parent,
  _args,
  { pool },
) => {
  const result = await pool.query(
    sql`
      UPDATE user_accounts AS ua
      SET email_address = ${_args.input.emailAddress!}
      FROM feature_flag_assignments, feature_flags
      WHERE feature_flags.id = ${_args.featureFlagId}
        AND feature_flag_assignments.actor_id = ua.id
        AND feature_flag_assignments.actor_type = 'UserAccount'
        AND feature_flags.id = feature_flag_assignments.feature_flag_id
      RETURNING ua.id, ua.given_name AS "givenName", ua.family_name AS "familyName", ua.email_address AS "emailAddress"
    `,
  );

  return result.rows;
};
