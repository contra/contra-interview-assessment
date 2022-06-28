import { SlonikMigrator } from '@slonik/migrator';
import { createPool } from 'slonik';

if (!process.env.POSTGRES_CONNECTION_STING) {
  throw new Error(
    'Must provide a PG connection string -- if you need a fresh database, we recommend using Render',
  );
}

const slonik = createPool(process.env.POSTGRES_CONNECTION_STING);

const migrator = new SlonikMigrator({
  logger: console,
  migrationsPath: __dirname + '/migrations',
  migrationTableName: 'migration',
  slonik,
});

migrator.runAsCLI();
