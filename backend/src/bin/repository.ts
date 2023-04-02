import Logger from 'roarr';
import { FeatureFlagUser } from './models/feature-flag-user';
import { UserAccount } from './models/user-account';

const logger = Logger.child({ context: 'bin/repositories/repository' });

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
  async getAllUsers(args: GetAllUsersArgs): Promise<UserAccount[]> {
    logger.debug({
      correlationId: args.correlationId
    }, 'Fetching all users');

    // Eager loading using this approach uses separate queries under the hood
    // as opposed to `withGraphJoined` which uses a single query with a join.
    // Without measuring, either approach could be bad or good. This method call
    // is made with an understanding that it may change in the future based on
    // request load to the server.
    return UserAccount.query().withGraphFetched('featureFlags');
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
