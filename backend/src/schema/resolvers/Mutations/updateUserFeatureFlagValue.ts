import { sql } from 'slonik';
import { MutationResolvers } from '../../../generated/types';

export const updateUserFeatureFlagValue: MutationResolvers['updateUserFeatureFlagValue'] = async (
  _parent,
  { userAccountId, featureFlagId, newValue },
  { pool }
) => {
  try {
    await pool.query(
      sql`
        UPDATE user_feature_flag_association
        SET value = jsonb_set(value, '{value}', ${sql.json(newValue)})
        WHERE user_id = ${userAccountId} AND feature_flag_id = ${featureFlagId}
      `
    );

    return true;
  } catch (error) {
    console.error('Failed to update feature flag value:', error);
    throw new Error('Failed to update feature flag value.');
  }
};
