import { sql } from 'slonik';
import { MutationResolvers } from '../../../generated/types';

export const resolve: MutationResolvers['createUserAccounts'] = async (
  _parent,
  _args,
  { pool },
) => {
  const name = 'john';
  const lastName = 'doe';
  const email = 'test@example.com';
  let query = sql`Insert into user_account (given_name, family_name, email_address) values (${name},${lastName},${email})`;

  try {
    const results = await pool.any(query);
    if (results) return 'success';
  } catch (error) {
    return 'failure';
  }
};
