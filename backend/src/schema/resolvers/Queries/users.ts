import { DatabasePoolType, sql } from 'slonik';
import type { queryUserInput, User, Flag } from '../../../ResolverContextType';
import { QueryResolvers } from '../../../generated/types';

/*
* return all flags for a specified user
*/
const getUserFlags = async (
  pool: DatabasePoolType,
  userId: number,
): Promise<Flag[]> => {
  const flags = await pool.any<Flag>(
    sql`
      SELECT
        feature_flag.id,
        feature_flag.name,
        feature_flag.description,
        feature_flag.type,
        coalesce(user_feature_flag.value, feature_flag.value) as value,
        coalesce(user_feature_flag.created_at, feature_flag.created_at) as created_at,
        coalesce(user_feature_flag.updated_at, feature_flag.updated_at) as updated_at
      FROM 
        feature_flag
      JOIN 
        user_feature_flag ON user_feature_flag.flag_id = feature_flag.id
      WHERE 
        user_feature_flag.user_id = ${userId}
    `,
  );

  return flags as Flag[] || [];
};

/*
* query database and return a single user
*/
export const queryUser: QueryResolvers['user'] = async (
  _parent,
  args,
  { pool },
) => {
  const { userId } = args as queryUserInput;

  const user = await pool.one<User>(
    sql` 
      SELECT
        id,
        given_name,
        family_name,
        email_address,
        created_at,
        updated_at
      FROM 
        user_account
      WHERE 
        id = ${userId}
    `,
  );

  return {
    ...user,
    flags: (await getUserFlags(pool, userId)) || [],
  };
};

/*
* query database and return all users
*/
export const queryUsers: QueryResolvers['users'] = async (
  _parent,
  _args,
  { pool },
) => {
  const users = await pool.any<User>(
    sql` 
      SELECT
        id,
        given_name,
        family_name,
        email_address,
        created_at,
        updated_at
      FROM 
        user_account
    `,
  );

  return Promise.all(
    users.map(async (user: User) => ({
      ...user,
      flags: (await getUserFlags(pool, user.id)) || [],
    })),
  );
};
