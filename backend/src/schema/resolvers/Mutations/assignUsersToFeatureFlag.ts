import { sql } from 'slonik';
import { MutationResolvers } from '../../../generated/types';

export const assignUsersToFeatureFlag: MutationResolvers['assignUsersToFeatureFlag'] = async (
  _parent,
  { userAccountIds, featureFlagId, value },
  { pool }
) => {
  const updateResults = [];

  try {
    // Query the feature flag to get its type
    const featureFlag = await pool.maybeOne<{ type: string }>(
      sql`
        SELECT possible_values ->> 'type' AS type
        FROM feature_flag 
        WHERE id = ${featureFlagId}
      `
    );

    if (!featureFlag) {
      throw new Error('Feature flag not found.');
    }

    const type = featureFlag.type;

    for (const userId of userAccountIds) {
      const result = await pool.query(
        sql`
          INSERT INTO user_feature_flag_association (user_id, feature_flag_id, value)
          VALUES (${userId}, ${featureFlagId}, ${sql.json({type, value })})
          ON CONFLICT (user_id, feature_flag_id) DO NOTHING
        `
      );

      // Check if insertion was successful and push the result to updateResults
      if (result.rowCount === 1) {
        updateResults.push({
          userId,
          "value": true
        });
      } else {
        updateResults.push({
          userId,
          "value": false
        });
      }
    }
    
return updateResults;
  } catch {
    throw new Error('Failed to assign users to feature flag.');
  }
};
