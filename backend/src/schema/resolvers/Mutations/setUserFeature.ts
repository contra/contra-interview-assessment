import { sql } from 'slonik';
import { MutationResolvers } from '../../../generated/types';

export const resolve: MutationResolvers['setUserFeature'] = async (
  _parent,
  _args,
  { pool },
) => {
  const { userId, status } = _args;

  if (userId === undefined) {
    return 'provide a userId!';
  }

  try {
    const query0 = sql`
    SELECT user_feature.featureId 
      FROM user_feature
      where user_feature.userId=${userId}
    `;
    const query1 = sql`UPDATE feature_flag SET status=${sql.json(
      status,
    )} WHERE id=(${query0})`;
    const results = await pool.query(query1);
    if (results) return 'success';
  } catch (error) {
    return 'failure';
  }
};
