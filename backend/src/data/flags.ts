import { DatabasePoolType, JsonSqlTokenType, sql } from 'slonik';
import { JsonScalar } from '../ResolverContextType';
import { FlagModel } from './types';
import { Roarr as log } from 'roarr';

export async function getAllFlags(
  pool: DatabasePoolType,
): Promise<FlagModel[]> {
  const flags = await pool.many<FlagModel>(
    sql`
      SELECT
        id,
        name,
        description,
        type,
        value,
        created_at,
        updated_at
      FROM feature_flag ff
    `,
  );

  log.info({ flags }, 'Get All Flags');

  return flags as FlagModel[];
}

export async function getFlag(
  pool: DatabasePoolType,
  flagId: number,
): Promise<FlagModel> {
  const flags = await pool.one<FlagModel>(
    sql`
      SELECT
        id,
        name,
        description,
        type,
        value,
        created_at,
        updated_at
      FROM feature_flag ff
      WHERE ff.id = ${flagId}
    `,
  );

  log.info({ flags }, 'Get All Flags');

  return flags;
}

export async function getUserFlags(
  pool: DatabasePoolType,
  userId: number,
): Promise<FlagModel[]> {
  console.log(userId);
  const flags = await pool.any<FlagModel>(
    sql`
      SELECT
        ff.id,
        ff.name,
        ff.description,
        ff.type,
        coalesce(uff.value, ff.value) as value,
        coalesce(uff.created_at, ff.created_at) as created_at,
        coalesce(uff.updated_at, ff.updated_at) as updated_at
      FROM feature_flag ff
      JOIN user_feature_flag uff ON uff.flag_id = ff.id
      WHERE uff.user_id = ${userId}
    `,
  );

  return flags as FlagModel[];
}

export async function targetUsersWithFlag(
  pool: DatabasePoolType,
  usersIds: number[],
  flagId: number,
  value?: JsonScalar | null,
): Promise<void> {
  const nowTimestamp = new Date().toISOString();

  // build a list of fields for the insert query, with a conditional "value"
  const fields = [sql`user_id`, sql`flag_id`, sql`updated_at`];
  if (value) {
    fields.push(sql`value`);
  }

  // build a continal list of values tuples for the insert query
  const inserValues = usersIds.map((userId: number) => {
    const values: (number | string | JsonSqlTokenType)[] = [
      userId,
      flagId,
      nowTimestamp,
    ];
    if (value) {
      values.push(sql.json(value));
    }
    return sql`(${sql.join(values, sql`, `)})`;
  });

  await pool.any<FlagModel>(
    sql` 
      INSERT INTO user_feature_flag (${sql.join(fields, sql`,`)})
      VALUES ${sql.join(inserValues, sql`, `)}
      ON CONFLICT (user_id, flag_id) DO UPDATE
      SET value = EXCLUDED.value, updated_at = EXCLUDED.updated_at
    `,
  );
}

export async function updateUserFlagValue(
  pool: DatabasePoolType,
  userId: number,
  flagId: number,
  value: JsonScalar,
) {
  const nowTimestamp = new Date().toISOString();
  await pool.query<FlagModel>(
    sql` 
      UPDATE user_feature_flag uff
      SET value = ${sql.json(value)}, updated_at = ${nowTimestamp}
      WHERE uff.user_id = ${userId} AND uff.flag_id = ${flagId}
    `,
  );
}
