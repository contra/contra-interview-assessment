import DataLoader from 'dataloader';
import { sql } from 'slonik';
import { FeatureFlagUserValue } from '../generated/types';
import type { CommonQueryMethodsType } from 'slonik';

function userFeatureFlagLoader(dbConnection: CommonQueryMethodsType) {
  return new DataLoader(async (userIds: readonly number[]) => {

    const queryString = sql<FeatureFlagUserValue>`
      SELECT
        ua.id as user_id,
        ff.flag_key,
        ff.flag_type,
        COALESCE(ffuv.flag_value, ff.default_value) as flag_value
      FROM
        user_account ua
        LEFT JOIN feature_flag_user_value ffuv
          ON ffuv.user_account_fk = ua.id
        LEFT JOIN feature_flag ff
          ON (ff.id = ffuv.feature_flag_fk OR ff.default_value is not NULL)
      WHERE
        ua.id IN (${sql.join(userIds, sql`, `)})
      ;
    `

  const queryPromise = dbConnection.many(queryString)
    .then(queryResult => {
      const userFeatureFlagsMap = new Map<number, FeatureFlagUserValue[]>();
      queryResult.forEach(featureFlag => {
        const userId = Number(featureFlag.userId);
        if (!userFeatureFlagsMap.has(userId)) {
          userFeatureFlagsMap.set(userId, [])
        }
        userFeatureFlagsMap.get(userId)!.push(featureFlag);
      })
      const userFeatureFlags = userIds
        .map(userId => userFeatureFlagsMap.get(userId) ?? []);
      return userFeatureFlags
    });

  return queryPromise;
  })
}

export default userFeatureFlagLoader;