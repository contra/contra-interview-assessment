import { Roarr } from 'roarr';
import { DatabasePoolType, sql } from 'slonik';
import { UserModel } from './types';

export const getAllUsers = async (
  pool: DatabasePoolType,
): Promise<UserModel[]> => {
  Roarr.info('Fetching users from database');

  const users = await pool.any<UserModel>(
    sql` 
      SELECT
      id,
      given_name,
      family_name,
      email_address,
      created_at,
      updated_at
      FROM user_account
    `,
  );

  Roarr.info({ users }, 'Users from database');

  /*
   * Work around readonly User[] returned by the query
   * doing it to avoid [...users] with unecessary extra memory allocation
   * */
  return users as UserModel[];
};

export const getUser = async (
  pool: DatabasePoolType,
  userId: number,
): Promise<UserModel> => {
  const result = await pool.one<UserModel>(
    sql` 
      SELECT
      id,
      given_name,
      family_name,
      email_address,
      created_at,
      updated_at
      FROM user_account
      WHERE id = ${userId}
      `,
  );

  return result;
};
