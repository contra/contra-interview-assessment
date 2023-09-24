import { GraphQLClient } from 'graphql-request';
import { createPool, sql } from 'slonik';
import {
  FlagInsertModel,
  generateFlags,
  getFlagsInsertSql,
} from '../bin/seed/flags';
import {
  generateUsers,
  getUsersInsertSql,
  UserInsertModel,
} from '../bin/seed/users';
import { getPgConfig } from '../config/databaseConfiguration';
import { FlagModel, UserModel } from '../data/types';
import { getSdk } from '../generated/types';
import { env } from './testEnv';
// @ts-expect-error
import { createInterceptors } from 'slonik-interceptor-preset';

const { connectionString } = getPgConfig();

const pool = createPool(connectionString, {
  captureStackTrace: false,
  connectionTimeout: 60 * 1_000,
  interceptors: createInterceptors(),
});

export function getGraphQLClient() {
  const client = new GraphQLClient(env.API_URL);
  return getSdk(client);
}

export async function createTestUser(
  input?: Partial<UserInsertModel>,
): Promise<UserModel> {
  const user = {
    ...generateUsers(1)[0],
    ...input,
  };
  const result = await pool.any<UserModel>(
    sql`
      ${getUsersInsertSql([user])}
      RETURNING *
    `,
  );

  return result[0];
}

export async function createTestFlag(
  input?: Partial<FlagInsertModel>,
): Promise<FlagModel> {
  const flag = {
    ...generateFlags(1)[0],
    ...input,
  };
  const result = await pool.any<FlagModel>(
    sql`
      ${getFlagsInsertSql([flag])}
      RETURNING *
    `,
  );

  return result[0];
}

export async function deleteUsers(ids: number[]): Promise<void> {
  await pool.query(
    sql`
      DELETE FROM user_account
      WHERE id in (${sql.join(ids, sql`,`)})
    `,
  );
}

export async function deleteFlags(ids: number[]): Promise<void> {
  await pool.query(
    sql`
      DELETE FROM feature_flag
      WHERE id in (${sql.join(ids, sql`,`)})
    `,
  );
}
