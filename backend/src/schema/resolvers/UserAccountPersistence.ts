import { sql } from 'slonik';
import { User } from '../../generated/types';

export class UserAccountPersistence {
  static async getAllUsers(pool: any): Promise<User[]> {
    return (await pool.many(
      sql`SELECT id, given_name as "givenName", family_name as "familyName", email_address as email from public.user_account`,
    )) as User[];
  }

  static async userExists(pool: any, userId: number): Promise<Boolean> {
    return pool.exists(
      sql`SELECT id from public.user_account WHERE id = ${userId} LIMIT 1`,
    );
  }
}
