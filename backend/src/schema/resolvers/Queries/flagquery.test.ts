import { user as resolve } from './flagQuery';
import { sql } from 'slonik';
import { createPool } from 'slonik';
import { DatabasePoolType } from 'slonik';

describe('flagquery resolver', () => {
  let pool: DatabasePoolType;

  beforeAll(() => {
    pool = createPool('postgres://josh:k65Tqw7l063Ek26ohgIJivQpbKn0nZYM@dpg-ckuenimb0mos7397j4n0-a.oregon-postgres.render.com/contra_3dte?ssl=true');
  });

  afterAll(async () => {
    await pool.end();
  });

  it('should return an array of users with their feature flags', async () => {
    // Insert test data
    await pool.query(sql`
      INSERT INTO users (id, given_name, family_name, email_address)
      VALUES (1, 'John', 'Doe', 'john.doe@example.com')
    `);
    await pool.query(sql`
      INSERT INTO feature_flags (id, name, value)
      VALUES (1, 'flag1', true), (2, 'flag2', false)
    `);
    await pool.query(sql`
      INSERT INTO user_feature_flags (user_id, feature_flag_id)
      VALUES (1, 1), (1, 2)
    `);

    // Call the resolver
    const result = await resolve({}, {}, { pool }, null);

    // Verify the result
    expect(result).toEqual([
        {
            given_name: 'John',
            family_name: 'Doe',
            email_address: 'john.doe@example.com',
            featureFlags: [
                { name: 'flag1', value: true },
                { name: 'flag2', value: false },
            ],
        },
    ]);

    // Clean up the test data
    await pool.query(sql`
      DELETE FROM user_feature_flags WHERE user_id = 1
    `);
    await pool.query(sql`
      DELETE FROM feature_flags WHERE id IN (1, 2)
    `);
    await pool.query(sql`
      DELETE FROM users WHERE id = 1
    `);
  });
});