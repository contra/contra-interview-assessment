import { sql } from 'slonik';
import { QueryResolvers } from '../../../generated/types';

export const user: QueryResolvers['feature'] = async (
  _parent, 
  _args,
  { pool }
  ) => {
      // Fetch all users with their feature flags
      const userResults = await pool.many<{
        given_name: string;
        family_name: string;
        email_address: string;
        featureFlags: Array<{
          name: string;
          value: boolean;
        }>;
      }>(  
        sql`
        SELECT users.*, json_agg(feature_flags.*) as featureFlags
        FROM users
        LEFT JOIN user_feature_flags ON users.id = user_feature_flags.user_id
        LEFT JOIN feature_flags ON feature_flags.id = user_feature_flags.feature_flag_id
        GROUP BY users.id
      `);
      return userResults.map(result =>({
        given_name: result.given_name,
        family_name: result.family_name,
        email_address: result.email_address,
        featureFlags: result.featureFlags
        }))
    };
  
  

