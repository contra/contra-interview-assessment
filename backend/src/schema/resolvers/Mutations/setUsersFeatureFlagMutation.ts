import { sql } from 'slonik';
import { SetUserFeatureFlagResponse, MutationResolvers } from '../../../generated/types';
import { FeatureFlagValue, getFeatureFlagType, isFeatureFlagValue } from '../Scalars/featureFlagScalars';

export const resolve: MutationResolvers['setUsersFeatureFlag'] = async (
  _parent,
  { userIds, featureFlagData },
  { pool },
): Promise<SetUserFeatureFlagResponse[]> => {

  type dbReturn = {
    featureFlagId: string
    userId: string
    flagValue: FeatureFlagValue
  }
  
  const { flagKey, flagValue } = featureFlagData;

  if (!isFeatureFlagValue(flagValue)) {
    throw new Error("Provided Feature Flag value is invalid")
  }

  const flagValueString = JSON.stringify(flagValue);
  const flagType = getFeatureFlagType(flagValue);

  const insertQueryString = sql<dbReturn>`
    INSERT INTO feature_flag_user_value (feature_flag_fk, user_account_fk, flag_value)
    SELECT
      ff.id  AS feature_flag_fk
      ,ua.id AS user_account_fk 
      ,${flagValueString} AS flag_value
    FROM
      user_account ua
      LEFT JOIN feature_flag ff ON ff.flag_key = ${flagKey}
    WHERE
      ua.id IN (${sql.join(userIds, sql`, `)})
      AND (ff.flag_type = ${flagType} OR ${flagType} = 'any')
    ON CONFLICT (feature_flag_fk, user_account_fk)
    DO UPDATE SET flag_value = ${flagValueString}
    RETURNING
      feature_flag_fk AS feature_flag_id
      ,user_account_fk as user_id
      ,flag_value as flag_value
    ;
  `

  const queryPromise = pool.any(insertQueryString)
    .then(queryResult => {
      const resultUserMap = new Set<number>();
      queryResult.forEach(({userId}) => {
        resultUserMap.add(parseInt(userId, 10));
      });
      return userIds.map(userId => {
        const response: SetUserFeatureFlagResponse = {
          userId,
          result: resultUserMap.has(parseInt(userId, 10))
            ? 'SUCCESS'
            : 'Failed to set feature flag. Check the given arguments.',
        }
        return response;
      })
    });

  return queryPromise;
};
