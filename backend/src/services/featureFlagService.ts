import { User, UserFeatureFlag } from '../sequelize/models';
import FeatureFlag from '../sequelize/models/FeatureFlag';

interface UserWithFeatureFlag extends User {
  UserFeatureFlag: UserFeatureFlag;
}

interface FeatureFlagWithUsers extends FeatureFlag {
  users: UserWithFeatureFlag[];
}

// eslint-disable-next-line fp/no-class
export class FeatureFlagService {
  async getFeatureFlags(): Promise<FeatureFlag[]> {
    const featureFlags = await FeatureFlag.findAll();

    return featureFlags.map(
      (featureFlag) => featureFlag.toJSON() as FeatureFlag,
    );
  }

  async getFeatureFlagById(id: string): Promise<FeatureFlag> {
    const featureFlag = await FeatureFlag.findByPk(id);
    if (!featureFlag) {
      throw new Error('Feature flag not found');
    }

    return featureFlag.toJSON() as FeatureFlag;
  }

  async targetUsers(
    featureFlagId: string,
    userIds: string[],
  ): Promise<FeatureFlag | null> {
    const featureFlag = await FeatureFlag.findByPk(featureFlagId);
    if (!featureFlag) {
      throw new Error(`Feature flag with ID '${featureFlagId}' not found`);
    }

    const userFeatureFlags = userIds.map((userId) => ({
      createdDate: new Date(),
      featureFlagId,
      updatedDate: new Date(),
      userId,
    }));
    await UserFeatureFlag.bulkCreate(userFeatureFlags, {
      ignoreDuplicates: true,
    });

    const users = await User.findAll({
      include: [
        {
          model: UserFeatureFlag,
          where: {
            featureFlagId,
          },
        },
      ],
    });

    if (users) {
      const usersWithFeatureFlag = users.map(
        (user) => user.toJSON() as User,
      ) as UserWithFeatureFlag[];

      const result = {
        ...featureFlag.toJSON(),
        users: usersWithFeatureFlag,
      } as FeatureFlagWithUsers;

      return result as FeatureFlag;
    }

    return {} as FeatureFlag;
  }
}
