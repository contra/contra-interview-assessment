import { sql } from 'slonik';
import { processFeatureFlagRows } from '../db';
import { QueryResolvers } from '../../../generated/types';

export const resolve: QueryResolvers['featureFlags'] = async (
  _parent,
  _args,
  { pool },
) => {
  const getFeatureFlagsQuery = sql`SELECT (id, type, user_assignments, created_at, updated_at) FROM feature_flags`;
  return processFeatureFlagRows((await pool.query(getFeatureFlagsQuery)).rows); // execute the SELECT statement, and return a list of all feature flags
};
