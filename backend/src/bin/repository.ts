import Logger from 'roarr';
import { FeatureFlag } from './models/feature-flag';
import { FeatureFlagUser } from './models/feature-flag-user';
import { UserAccount } from './models/user-account';

const logger = Logger.child({ context: 'bin/repositories/repository' });

type RelatedFeatureFlags = FeatureFlag & Pick<FeatureFlagUser, 'override'>;

export type UserWithFeatureFlags = {
  user: UserAccount;
  featureFlags: RelatedFeatureFlags[]
}

type DebugArgs = {
  correlationId: string;
}

type GetAllUsersArgs = {} & DebugArgs;

type UpdateUserFeatureFlagArgs = {
  userId: string;
  featureFlagId: string;
  value: string;
} & DebugArgs;

type TargetUsersArgs = {
  targets: {
    userId: string;
    featureFlags: {
      id: string;
      value?: string;
    }[];
  }[];
} & DebugArgs;

export class Repository {
  async getAllUsers(args: GetAllUsersArgs): Promise<UserWithFeatureFlags[]> {
    logger.debug({
      correlationId: args.correlationId
    }, 'Fetching all users');

    const results = await UserAccount.query().withGraphFetched('featureFlags');

    return results.map((user: UserAccount) => {
      user.featureFlags = user.featureFlags!.map((featureFlag) => {
        if (featureFlag.override !== null) {
          featureFlag.value = featureFlag.override;
        }
        return featureFlag;
      });

      return {
        user,
        featureFlags: user.featureFlags
      };
    });
  }


  /**
   * Updates a feature flag for a specific user
   *
   * @param {UpdateUserFeatureFlagArgs} args
   * @returns {Promise<FeatureFlagUser>}
   * @memberof Repository
   */
  async updateUserFeatureFlag(args: UpdateUserFeatureFlagArgs): Promise<FeatureFlagUser> {
    logger.debug({
      userId: args.userId,
      featureFlagId: args.featureFlagId
    }, 'Attempting to update feature flag for user')

    const { userId, featureFlagId, value } = args;

    let result;
    result = await FeatureFlagUser.query()
      .update({ override: value })
      .where({
        user_id: parseInt(userId),
        feature_flag_id: parseInt(featureFlagId)
      })
      .returning('*')
      .first();

    if (!result) {
      result = await FeatureFlagUser.query()
        .insert({ userId, featureFlagId, override: value })
        .returning('*');
    }

    return result;
  }

  /**
   * Target users with feature flags.
   *
   * @param {TargetUsersArgs[]} args Collection of user IDs and feature flags to target them with
   * @returns {Promise<FeatureFlagUser[]>}
   * @memberof Repository
   */
  async targetUsers(args: TargetUsersArgs): Promise<FeatureFlagUser[]> {
    logger.debug({
      correlationId: args.correlationId,
    }, 'Attaching users with feature flags');

    const values = args.targets.flatMap((arg: any) => {
      return arg.featureFlags.flatMap((featureFlag: any) => {
        return {
          user_id: parseInt(arg.userId),
          feature_flag_id: parseInt(featureFlag.id),
          override: featureFlag.value || null
        };
      });
    });

    return FeatureFlagUser.query().insert(values).returning('*');
  }
}
