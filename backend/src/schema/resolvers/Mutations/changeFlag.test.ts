import { resolve } from './changeFlag';
import { sql } from 'slonik';
import { createPool } from 'slonik';
import { DatabasePoolType } from 'slonik';

describe('changeFlag mutation resolver', () => {
  let pool: DatabasePoolType;

  beforeAll(() => {
    pool = createPool('postgres://user:password@localhost:5432/mydatabase');
  });

  afterAll(async () => {
    await pool.end();
  });

  it('should update the value of a feature flag', async () => {
    const feature_flag_id = 1;
    const value = 0;

    // Insert a feature flag with the initial value
    await pool.query(sql`
      INSERT INTO feature_flags (id, value)
      VALUES (${feature_flag_id}, 1)
    `);

    // Call the mutation resolver to update the value
    const result = await resolve(null, { feature_flag_id, value }, { pool });

    // Verify that the value was updated
    expect(result.value).toBe(value);

    // Clean up the test data
    await pool.query(sql`
      DELETE FROM feature_flags WHERE id = ${feature_flag_id}
    `);
  });
});