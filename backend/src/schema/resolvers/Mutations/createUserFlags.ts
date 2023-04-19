import { sql } from 'slonik';
import { MutationResolvers } from '../../../generated/types';

export const resolve: MutationResolvers['createUserFlags'] = async (
  _parent,
  _args,
  { pool },
) => {
  const featureId = 3;
  const userId = 3;

  let query = sql`Insert into user_feature (featureId, userId) values (${featureId},${userId})`;

  try {
    const results = await pool.query(query);
    if (results) return 'success';
  } catch (error) {
    return 'failure';
  }
};
