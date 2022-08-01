import { SlonikMigrator } from '@slonik/migrator';
import { createPool } from 'slonik';

require('dotenv').config();

if (!process.env.POSTGRES_CONNECTION_STRING) {
  throw new Error(
    'Must provide a PG connection string (export POSTGRES_CONNECTION_STRING=value) -- if you need a fresh database, we recommend using Render.com',
  );
}

const slonik = createPool(process.env.POSTGRES_CONNECTION_STRING);

const migrator = new SlonikMigrator({
  logger: console,
  migrationsPath: __dirname + '/migrations',
  migrationTableName: 'migration',
  slonik,
});

migrator.runAsCLI();
