import { sql } from 'slonik';
import { MutationResolvers } from '../../../generated/types';

export const resolve: MutationResolvers['targetUsersWithFeatureFlag'] = async (
  _parent,
  { userIds, featureId, flagValue },
  { pool }
) => {
  const userFeatureFlagRows = userIds.map((userId) => [
    featureId,
    userId,
    flagValue,
    'NOW()',
    'NOW()'
  ]);

  const result = await pool.query(sql`
    INSERT INTO user_feature_flag (feature_id, user_id, flag, created_at, updated_at)
    SELECT *
    FROM ${sql.unnest(userFeatureFlagRows, [
      'int4',
      'int4',
      'jsonb',
      'timestamptz',
      'timestamptz'
    ])}
    ON CONFLICT ON CONSTRAINT uc_feature_user DO UPDATE SET flag = ${flagValue}, updated_at = NOW()
    RETURNING *
  `);

  if (result.rowCount > 0) {
    return result.rows.map((row) => ({
      featureId: <string>row.featureId,
      flagValue: row.flag,
      userId: <string>row.userId
    }));
  }

  return [];
};
