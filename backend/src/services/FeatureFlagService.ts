/* eslint-disable fp/no-this */
/* eslint-disable fp/no-class */
import { FeatureFlag, PrismaClient, UserFlag } from '@prisma/client';
import { UserFeatureFlagInput, UserFeatureFlagOutput } from './types';

export class FeatureFlagService {
  readonly db: PrismaClient;

  constructor(database: PrismaClient) {
    this.db = database;
  }

  /**
   * ************************************************************************************************
   * *************************************** Feature Flag *******************************************
   * ************************************************************************************************
   */

  /**
   *
   * @param featureFlagId
   * @returns return a single feature flag
   */
  async findFeatureFlag(featureFlagId: string): Promise<FeatureFlag> {
    const featureFlag = await this.db.featureFlag.findUnique({
      where: { id: featureFlagId },
    });

    if (!featureFlag) {
      throw new Error('Feature flag not found');
    }

    return featureFlag;
  }

  /**
   *
   * @returns return an array of feature flags
   */
  async findAllFeatureFlags(): Promise<FeatureFlag[]> {
    const allFeatureFlags = await this.db.featureFlag.findMany();
    if (!allFeatureFlags) {
      throw new Error('failed to fetch some feature flags');
    }

    return allFeatureFlags;
  }

  /**
   * ************************************************************************************************
   * *************************************** User Feature Flag **************************************
   * ************************************************************************************************
   */

  async findUserFeatureFlags(
    userId: string,
    featureFlagId: string,
  ): Promise<UserFlag> {
    const userfeatureFlag = await this.db.userFlag.findUnique({
      where: { userId_featureFlagId: { featureFlagId, userId } },
    });

    if (!userfeatureFlag) {
      throw new Error(
        `User flag with userId ${userId} and featureFlagId ${featureFlagId} not found`,
      );
    }

    return userfeatureFlag;
  }

  /**
   *
   * @param userIds - array of users ids to find the feature flags they are linked to
   * @param featureFlagId - the feature flag id
   * @returns an array of user feature flags
   */
  async findUsersFeatureFlags(
    userIds: string[],
    featureFlagId: string,
  ): Promise<UserFeatureFlagOutput[]> {
    const usersFlags = await this.db.userFlag.findMany({
      select: { featureFlagId: true, userId: true },
      where: { featureFlagId, userId: { in: userIds } },
    });

    if (!usersFlags || usersFlags.length === 0) {
      throw new Error('failed to fetch some user feature flags');
    }

    return usersFlags;
  }

  /**
   *
   * @param input - an array of user feature flags to create
   * @returns void
   */
  async createUsersFeatureFlag(input: UserFeatureFlagInput[]): Promise<void> {
    try {
      await this.db.userFlag.createMany({ data: input });
    } catch {
      throw new Error('failed to create and save feature flags');
    }
  }

  async updateUsersFeatureFlag(input: UserFeatureFlagInput): Promise<void> {
    try {
      const { featureFlagId, userId, value } = input;
      await this.db.userFlag.update({
        data: {
          value,
        },
        where: {
          userId_featureFlagId: { featureFlagId, userId },
        },
      });
    } catch {
      throw new Error('failed to update the feature flag value for this user');
    }
  }
}
