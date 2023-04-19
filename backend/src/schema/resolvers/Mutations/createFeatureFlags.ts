import { sql } from 'slonik';
import { MutationResolvers } from '../../../generated/types';

export const resolve: MutationResolvers['createFeatureFlags'] = async (
  _parent,
  _args,
  { pool },
) => {
  const name = 'feature1';
  const data = {
    access: true,
    availablity: 'remote',
  };
  const status = JSON.stringify(data);

  let query = sql`Insert into feature_flag (feature_name,status) values (${name},${status})`;

  try {
    const results = await pool.query(query);
    if (results) return 'success';
  } catch (error) {
    return 'failure';
  }
};
