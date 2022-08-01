import { sql } from 'slonik';
import { MutationResolvers } from '../../../generated/types';

// @ts-ignore
export const resolve: MutationResolvers['updateFeatureFlags'] = async (
  _parent,
  _args,
  { pool },
) => {
  const result = await pool.query(
    sql`
      UPDATE feature_flags
      SET value = ${_args.input.value!}
      FROM feature_flag_assignments
      WHERE feature_flag_assignments.actor_type = 'UserAccount'
        AND feature_flag_assignments.actor_id IN (${_args.userAccountIds.join(
          ',',
        )})
        AND feature_flag_assignments.feature_flag_id = feature_flags.id
      RETURNING feature_flags.id, feature_flags.value
    `,
  );

  return result.rows;
};
