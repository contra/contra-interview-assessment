import { createPool, sql } from 'slonik';
import 'dotenv/config';

if (!process.env.POSTGRES_CONNECTION_STRING) {
  throw new Error(
    'Must provide a PG connection string (export POSTGRES_CONNECTION_STRING=value)',
  );
}

const pool = createPool(process.env.POSTGRES_CONNECTION_STRING);
async function populateDatabase() {
  // Insert sample users
  const users = await pool.many(
    sql`
      INSERT INTO user_account (given_name, family_name, email_address)
      VALUES ('John', 'Doe', 'john.doe@example.com'),
             ('Jane', 'Doe', 'jane.doe@example.com')
      RETURNING id;
    `,
  );

  // Insert sample feature flags
  const featureFlags = await pool.many(
    sql`
      INSERT INTO feature_flags (id, name, values)
      VALUES (${users[0].id}, 'new_feature_A', ARRAY['A', 'B', 'C']),
             (${users[1].id}, 'new_feature_B', ARRAY['X', 'Y', 'Z'])
      RETURNING id;
    `,
  );

  // Insert sample feature flag assignments
  await pool.query(
    sql`
      INSERT INTO feature_flag_assignments (user_id, feature_flag_id, value)
      VALUES (${users[0].id}, ${featureFlags[0].id}, 'A'),
             (${users[0].id}, ${featureFlags[1].id}, 'X'),
             (${users[1].id}, ${featureFlags[0].id}, 'C');
    `,
  );

  console.log('Database populated successfully');
}

populateDatabase()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Error populating the database:', error);
    process.exit(1);
  });