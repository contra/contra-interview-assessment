const POSTGRES_DIALECT = 'postgres';
const MAX_CONNECTIONS = 1;
const MIN_CONNECTIONS = 0;
const ONE_SECOND = 1_000;
const UUID_GENERATE = 'uuid_generate_v4';
const UUID_SUPPORT = 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";';

export const configConstants = {
  MAX_CONNECTIONS,
  MIN_CONNECTIONS,
  ONE_SECOND,
  POSTGRES_DIALECT,
  UUID_GENERATE,
  UUID_SUPPORT,
};
