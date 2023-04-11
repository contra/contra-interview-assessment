import { sql } from 'slonik';
import { MutationResolvers } from '../../../generated/types';

export const resolve: MutationResolvers['updateFeatureFlagValue'] = async (
  _parent,
  { userId, featureId, flagValue },
  { pool }
) => {
  const result = await pool.query(sql`
      UPDATE user_feature_flag
      SET flag = ${flagValue}, updated_at = NOW()
      WHERE user_id = ${userId} AND feature_id = ${featureId}
      RETURNING *
    `);

  if (result.rowCount === 1) {
    return { featureId, flagValue, userId };
  }

  throw new Error('Could not update feature flag value');
};
