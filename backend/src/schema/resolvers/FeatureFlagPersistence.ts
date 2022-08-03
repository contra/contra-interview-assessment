import { sql, NotFoundError, DatabasePoolType } from 'slonik';
import { UserAccountPersistence } from './UserAccountPersistence';
import { FeatureFlagData } from '../../generated/types';

export class FeatureFlagPersistence {
  static async doesFeatureFlagExist(
    pool: DatabasePoolType,
    userId: number,
    flagData: FeatureFlagData,
  ): Promise<Boolean> {
    return pool.exists(
      sql`SELECT id from public.feature_flag WHERE flag_key = ${flagData.key} AND user_id = ${userId} LIMIT 1`,
    );
  }

  static async getUsersIdsHaveFlag(
    pool: DatabasePoolType,
    userIds: number[],
    flagKey: string,
  ): Promise<number[]> {
    try {
      const rows = (await pool.many(
        sql`SELECT user_id as "userId" from public.feature_flag WHERE flag_key = ${flagKey} AND user_id IN (${sql.join(
          userIds,
          sql`, `,
        )})`,
      )) as { userId: number }[];
      return rows.map((e) => e.userId);
    } catch (err) {
      if (err instanceof NotFoundError) return [];
      console.error(err);
      throw err;
    }
  }

  static async bulkCreateFeatureFlag(
    pool: DatabasePoolType,
    userIds: number[],
    flagData: FeatureFlagData,
  ) {
    const insertData = buildBulkValues(userIds, flagData);
    return await pool.query(
      sql`INSERT INTO public.feature_flag (user_id, flag_key, flag_value) VALUES ${insertData}`,
    );
  }

  static async bulkUpdateFeatureFlag(
    pool: DatabasePoolType,
    userIds: number[],
    flagData: FeatureFlagData,
  ) {
    const updateData = buildBulkValues(userIds, flagData);

    try {
      // notice the cast to ::varchar, postgre does not do any magic typecasting for you
      const updateResult = await pool.query(
        sql`UPDATE public.feature_flag as ff SET flag_value = ff2.flag_value FROM (values ${updateData}) as ff2(user_id, flag_key, flag_value) where ff2.flag_key = ff.flag_key AND ff2.user_id = ff.user_id::varchar`,
      );
      if (updateResult.rowCount != userIds.length)
        throw new Error('Failed to update feature flag in a bulk!');
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async updateFeatureFlag(
    pool: DatabasePoolType,
    userId: number,
    flagData: FeatureFlagData,
  ) {
    const updateResult = await pool.query(
      sql`UPDATE public.feature_flag SET flag_value = ${flagData.value} WHERE flag_key = ${flagData.key} AND user_id = ${userId}`,
    );
    if (updateResult.rowCount != 1)
      throw new Error('Failed to update feature flag!');
  }

  static async createFeatureFlag(
    pool: DatabasePoolType,
    userId: number,
    flagData: FeatureFlagData,
  ) {
    const createResult = await pool.query(sql`
          INSERT INTO
          public.feature_flag (
            id,
            user_id,
            flag_key,
            flag_value
          )
          VALUES
          (
            DEFAULT,
            ${userId},
            ${flagData.key},
            ${flagData.value}
          );
          `);
    if (createResult.rowCount != 1)
      throw new Error('Failed to create feature flag!');
  }

  static async setFeatureFlag(
    pool: DatabasePoolType,
    userId: number,
    flagData: FeatureFlagData,
  ): Promise<Boolean> {
    try {
      const userExists = await UserAccountPersistence.userExists(pool, userId);
      if (!userExists) return false;

      const featureFlagExists = await FeatureFlagPersistence.doesFeatureFlagExist(
        pool,
        userId,
        flagData,
      );

      if (featureFlagExists) {
        await FeatureFlagPersistence.updateFeatureFlag(pool, userId, flagData);
      } else {
        await FeatureFlagPersistence.createFeatureFlag(pool, userId, flagData);
      }
    } catch (err) {
      console.error(err);
      return false;
    }
    return true;
  }
}
export function buildBulkValues(userIds: number[], flagData: FeatureFlagData) {
  function buildUpdateValue(
    userId: number,
    flagKey: string,
    flagValue: string,
  ) {
    return sql`(${sql.join([userId, flagKey, flagValue], sql`,`)})`;
  }

  function buildUpdateData(userIds: number[], flagData: FeatureFlagData) {
    return userIds.map((userId) =>
      buildUpdateValue(userId, flagData.key, flagData.value),
    );
  }

  const updateDataRaw = buildUpdateData(userIds, flagData);
  const updateData = sql`${sql.join(updateDataRaw, sql`,`)}`;
  return updateData;
}
