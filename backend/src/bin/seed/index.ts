import { createPool } from 'slonik';
import { getPgConfig } from '../../config/databaseConfiguration';
import { generateUsers, getUsersInsertSql } from './users';
import { generateFlags, getFlagsInsertSql } from './flags';

(async () => {
  const { connectionString } = getPgConfig();
  const pool = createPool(connectionString);

  const users = generateUsers(5);
  const flags = generateFlags(5);

  await pool.transaction(async (tc) => {
    await tc.query(getUsersInsertSql(users));
    await tc.query(getFlagsInsertSql(flags));
  });
})();
