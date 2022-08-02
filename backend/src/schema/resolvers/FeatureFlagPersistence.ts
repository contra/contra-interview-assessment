import { sql } from 'slonik';
import { UserAccountPersistence } from './UserAccountPersistence';
import { FeatureFlagData } from '../../generated/types';

export class FeatureFlagPersistence {
  static async doesFeatureFlagExist(
    pool: any,
    userId: number,
    flagData: FeatureFlagData,
  ): Promise<Boolean> {
    return pool.exists(
      sql`SELECT id from public.feature_flag WHERE flag_key = ${flagData.key} AND user_id = ${userId} LIMIT 1`,
    );
  }

  static async updateFeatureFlag(
    pool: any,
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
    pool: any,
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
    pool: any,
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
