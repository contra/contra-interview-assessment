import { sql } from 'slonik';
import { QueryResolvers, UserFlags } from '../../../generated/types';

export const resolve: QueryResolvers['getAllUsersFlags'] = async (
  _parent,
  _args,
  { pool },
) => {
  try {
    const result = await pool.many<UserFlags>(
      sql`SELECT user_account.given_name , feature_flag.feature_name, feature_flag.status 
          FROM user_feature
          JOIN user_account ON user_account.id = user_feature.userId
          JOIN feature_flag ON feature_flag.Id = user_feature.featureId
      `,
    );

    return result as UserFlags[];
  } catch (error) {
    return [
      {
        featureName: '',
        givenName: '',
        status: '',
      } as UserFlags,
    ];
  }
};
