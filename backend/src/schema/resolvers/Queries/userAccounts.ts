import { sql } from 'slonik';
import { QueryResolvers } from '../../../generated/types';

export const userAccounts: QueryResolvers['userAccounts'] = async (
  _parent,
  _args,
  { pool },
) => {
  const userResults = await pool.many<{
    id: string; 
    givenName: string; 
    familyName: string; 
    emailAddress: string;
  }>(
    sql`SELECT id, given_name, family_name, email_address FROM user_account`
  );

  return userResults.map(result => ({
    emailAddress: result.emailAddress,
    familyName: result.familyName,
    givenName: result.givenName,
    id: result.id,
  }));
};
