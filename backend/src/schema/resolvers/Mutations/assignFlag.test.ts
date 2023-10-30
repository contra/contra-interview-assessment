import { resolve as assignFlag } from './assignFlag';
import { sql } from 'slonik';
import { createPool } from 'slonik';
import { DatabasePoolType } from 'slonik';
import { ResolverContext } from '../../../ResolverContextType';
import { User } from '../../../generated/types';

describe('assignFlag', () => {
  let pool: DatabasePoolType;

  beforeAll(() => {
    pool = createPool('postgres://user:password@localhost:5432/mydb');
  });

  afterAll(async () => {
    await pool.end();
  });

  it('should assign a feature flag to a user', async () => {
    const user_id = 1;
    const feature_flag_id = 2;
    const context: ResolverContext = { pool };

    await assignFlag(undefined, { user_id, feature_flag_id }, context);

    const user: User = await pool.one(sql`
      SELECT * FROM users WHERE id = ${user_id}
    `);

    expect(user).toBeDefined();
    expect(user.id).toBe(user_id);
  });

  it('should not assign a feature flag to a user if it already exists', async () => {
    const user_id = 1;
    const feature_flag_id = 2;
    const context: ResolverContext = { pool };

    await pool.query(sql`
      INSERT INTO user_feature_flags (user_id, feature_flag_id)
      VALUES (${user_id}, ${feature_flag_id})
    `);

    await assignFlag(undefined, { user_id, feature_flag_id }, context);

    const user: User = await pool.one(sql`
      SELECT * FROM users WHERE id = ${user_id}
    `);

    expect(user).toBeDefined();
    expect(user.id).toBe(user_id);
  });
});