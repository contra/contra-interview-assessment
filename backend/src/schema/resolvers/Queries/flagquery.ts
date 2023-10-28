import { sql } from 'slonik';
import { QueryResolvers } from '../../../generated/types';

export const resolve: QueryResolvers['feature'] = async (
  _parent,
  _args,
  { pool },
) => {
      // Fetch all users with their feature flags
      const result = await pool.many(sql`
        SELECT users.*, json_agg(feature_flags.*) as featureFlags
        FROM users
        LEFT JOIN user_feature_flags ON users.id = user_feature_flags.user_id
        LEFT JOIN feature_flags ON feature_flags.id = user_feature_flags.feature_flag_id
        GROUP BY users.id
      `);
      return result;
    };
  
  

