import { SlonikMigrator } from '@slonik/migrator';
import { createPool } from 'slonik';
import { getPgConfig } from '../config/databaseConfiguration';

const { connectionString } = getPgConfig();
const slonik = createPool(connectionString);

const migrator = new SlonikMigrator({
  logger: console,
  migrationsPath: __dirname + '/migrations',
  migrationTableName: 'migration',
  slonik,
});

migrator.runAsCLI();
