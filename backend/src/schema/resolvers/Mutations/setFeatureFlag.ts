import { sql } from 'slonik';
import { MutationResolvers } from '../../../generated/types';

export const resolve: MutationResolvers['setFeatureFlag'] = async (
  _parent,
  _args,
  { pool },
) => {
  const { featureId, status } = _args;

  if (featureId === undefined) {
    return 'provide a featureId!';
  }

  try {
    const query = sql`UPDATE feature_flag SET status=${sql.json(
      status,
    )} WHERE id=(${featureId})`;
    const results = await pool.query(query);
    if (results) return 'success';
  } catch (error) {
    return 'failure';
  }
};
