import { NotFoundError, sql } from 'slonik';
import { User } from '../../generated/types';
import { DEFAULT_SKIP, DEFAULT_LIMIT } from '../../constants';

export class UserAccountPersistence {
  static async getAllUsers(
    pool: any,
    skip = DEFAULT_SKIP,
    limit = DEFAULT_LIMIT,
  ): Promise<User[]> {
    return (await pool.many(
      sql`SELECT id, given_name as "givenName", family_name as "familyName", email_address as email from public.user_account order by id desc limit ${limit} offset ${skip}`,
    )) as User[];
  }

  static async userExists(pool: any, userId: number): Promise<Boolean> {
    return pool.exists(
      sql`SELECT id from public.user_account WHERE id = ${userId} LIMIT 1`,
    );
  }

  static async getUsersByIds(pool: any, ids: number[]): Promise<User[]> {
    try {
      return (await pool.many(
        sql`SELECT id, given_name as "givenName", family_name as "familyName", email_address as email from public.user_account WHERE id IN (${sql.join(
          ids,
          sql`, `,
        )})`,
      )) as User[];
    } catch (err) {
      if (err instanceof NotFoundError) return [];
      console.error(err);
      throw err;
    }
  }
}
