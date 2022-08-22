import { sql } from 'slonik';
import { RemoveUserFeatureFlagResponse, MutationResolvers } from '../../../generated/types';
import { FeatureFlagValue } from '../Scalars/featureFlagScalars';

export const resolve: MutationResolvers['removeUsersFeatureFlag'] = async (
  _parent,
  { userIds, featureFlagKey },
  { pool },
): Promise<RemoveUserFeatureFlagResponse[]> => {

  type dbReturn = {
    featureFlagId: string
    userId: string
    flagValue: FeatureFlagValue
  }

  const insertQueryString = sql<dbReturn>`
    DELETE FROM feature_flag_user_value ffuv
    USING
      feature_flag ff
    WHERE
      ffuv.user_account_fk IN (${sql.join(userIds, sql`, `)})
      AND (ffuv.feature_flag_fk = ff.id)
      AND (ff.flag_key = ${featureFlagKey})
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
        const response: RemoveUserFeatureFlagResponse = {
          userId,
          result: resultUserMap.has(parseInt(userId, 10))
            ? 'SUCCESS'
            : 'Failed to remove feature flag. User may not have feature flag '
              + 'set, or arguments may be incorrect.',
        }
        return response;
      })
    });

  return queryPromise;
};
