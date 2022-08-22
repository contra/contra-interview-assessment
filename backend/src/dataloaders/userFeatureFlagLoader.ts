import DataLoader from 'dataloader';
import { sql } from 'slonik';
import { FeatureFlagUserValue } from '../generated/types';
import type { CommonQueryMethodsType } from 'slonik';
import { unstringifyFeatureFlagValue } from '../schema/resolvers/Scalars/featureFlagScalars';

function userFeatureFlagLoader(dbConnection: CommonQueryMethodsType) {
  return new DataLoader(async (userIds: readonly number[]) => {
    type dbFeatureFlagUserValue = {
      userId: string
      flagKey: string
      flagType: string
      flagValue: string
    }

    const queryString = sql<dbFeatureFlagUserValue>`
      SELECT
        ua.id as user_id
        ,ff.flag_key
        ,ff.flag_type
        ,COALESCE(ffuv.flag_value, ff.default_value) as flag_value
      FROM
        user_account ua 
        CROSS JOIN feature_flag ff
        LEFT JOIN feature_flag_user_value ffuv
          ON ffuv.feature_flag_fk = ff.id AND ffuv.user_account_fk = ua.id
      WHERE
        ua.id IN (${sql.join(userIds, sql`, `)})
        AND (ff.default_value IS NOT NULL OR ffuv.flag_value IS NOT NULL)
      ;
    `

  const queryPromise = dbConnection.many(queryString)
    .then(queryResult => {
      const userFeatureFlagsMap = new Map<number, FeatureFlagUserValue[]>();
      queryResult.forEach(featureFlag => {
        const userId = Number(featureFlag.userId);
        // Create empty list for user if one doesn't exist
        if (!userFeatureFlagsMap.has(userId)) {
          userFeatureFlagsMap.set(userId, [])
        }
        // Convert DB representation to GraphQL representation
        const featureFlagUserValue: FeatureFlagUserValue = {
          userId: featureFlag.userId,
          flagKey: featureFlag.flagKey,
          flagType: featureFlag.flagType,
          flagValue: unstringifyFeatureFlagValue(featureFlag.flagValue),
        }
        // Add feature flag to user list
        userFeatureFlagsMap.get(userId)!.push(featureFlagUserValue);
      })
      const userFeatureFlags = userIds
        .map(userId => userFeatureFlagsMap.get(userId) ?? []);
      return userFeatureFlags
    });

  return queryPromise;
  })
}

export default userFeatureFlagLoader;