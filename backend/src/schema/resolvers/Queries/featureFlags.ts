import { sql } from 'slonik';
import { FeatureFlag, QueryResolvers } from '../../../generated/types';
import { unstringifyNullableFeatureFlagValue } from '../Scalars/featureFlagScalars';

export const resolve: QueryResolvers['featureFlags'] = async (
  _parent,
  _args,
  { pool },
): Promise<FeatureFlag[]> => {
  type dbFeatureFlagRow = {
    flagKey: string
    flagType: string
    defaultValue: string
  }

  const queryString = sql<dbFeatureFlagRow>`
    SELECT
      flag_key, flag_type, default_value 
    FROM
      feature_flag
    ;
  `

  const resultPromise = pool.query(queryString)
    .then(queryResult => {
      const featureFlagList = queryResult.rows.map(row => {
        const { flagKey, flagType, defaultValue } = row;
        const featureFlag = {
          flagKey,
          flagType,
          defaultValue: unstringifyNullableFeatureFlagValue(defaultValue),
        }
        return featureFlag;
      });
      return featureFlagList;
    });

  return resultPromise;
};
