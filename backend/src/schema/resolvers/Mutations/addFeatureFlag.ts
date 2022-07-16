import { sql } from 'slonik';
import { processFeatureFlagRow } from '../db';
import { MutationResolvers } from '../../../generated/types';

export const resolve: MutationResolvers['addFeatureFlag'] = async(
  _parent,
  _args,
  { pool }
) => {
  const addFeatureFlagQuery = sql`INSERT INTO feature_flags (id, type)
    VALUES (${_args.input.id}, ${_args.input.type})
    RETURNING (id, type, user_assignments, created_at, updated_at)`;

  // execute the INSERT statement, and return the newly created feature flag
  return processFeatureFlagRow((await pool.query(addFeatureFlagQuery)).rows[0]); 
};
