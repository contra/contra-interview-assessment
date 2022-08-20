import { sql } from 'slonik';
import { User, QueryResolvers } from '../../../generated/types';

export const resolve: QueryResolvers['users'] = async (
  _parent,
  _args,
  { pool },
): Promise<User[]> => {
  const queryString = sql<User>`
    SELECT
      id as user_id, given_name, family_name, email_address 
    FROM
      user_account
    ;
  `

  const userQueryPromise = pool.many(queryString)
    .then(queryResult => [...queryResult]);

  return userQueryPromise
};
