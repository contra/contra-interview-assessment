import {sql} from 'slonik';
import {QueryResolvers, User} from '../../../generated/types';

export const resolve: QueryResolvers['users'] = async (
  _parent,
  _args,
  {pool},
) => {
  const result = await pool.many<User>(
    sql`SELECT *,
        (
           SELECT json_object_agg(ff.name, ff.value)
           FROM feature_flag ff
           WHERE user_id = user_account.id
        ) as flags
        FROM user_account;`
  );

  return result.map(x => Object.assign({}, x, {flags: Object.assign({}, x.flags)}));
};
