import { sql } from 'slonik';
import { FeatureFlag, QueryResolvers } from '../../../generated/types';

export const resolve: QueryResolvers['featureFlags'] = async (
  _parent,
  _args,
  { pool },
): Promise<FeatureFlag[]> => {
  const queryString = sql<FeatureFlag>`
    SELECT
      flag_key, flag_type, default_value 
    FROM
      feature_flag
    ;
  `
  const resultPromise = pool.query(queryString)
    .then(queryResult => [...queryResult.rows]);

  return resultPromise;
};
