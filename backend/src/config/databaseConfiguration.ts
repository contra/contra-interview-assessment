import { cleanEnv, str } from 'envalid';

export type PostgresConfiguration = {
  connectionString: string;
};

export function getPgConfig(): PostgresConfiguration {
  const pgEnv = cleanEnv(process.env, {
    POSTGRES_PASSWORD: str({ devDefault: 'contra_password' }),
    POSTGRES_DB: str({ devDefault: 'contra_ff' }),
    POSTGRES_USER: str({ devDefault: 'contra' }),
    POSTGRES_ADDRESS: str({ devDefault: 'localhost:5432' }),
  });

  return {
    connectionString: `postgres://${pgEnv.POSTGRES_USER}:${pgEnv.POSTGRES_PASSWORD}@${pgEnv.POSTGRES_ADDRESS}/${pgEnv.POSTGRES_DB}?sslmode=disable`,
  };
}
