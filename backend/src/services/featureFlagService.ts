import { Op } from 'sequelize';
import { User, UserFeatureFlag } from '../sequelize/models';
import FeatureFlag from '../sequelize/models/FeatureFlag';
import logger from '../utils/logger';

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

    return featureFlags.map((featureFlag) => featureFlag.toJSON());
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
      include: [{ model: UserFeatureFlag, where: { featureFlagId } }],
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

  async updateUserFeatureFlag(
    featureFlagId: string,
    userId: string,
    value: string,
  ): Promise<User | null> {
    try {
      const featureFlag = await FeatureFlag.findByPk(featureFlagId);

      const user = await User.findByPk(userId);
      if (!featureFlag || !user) {
        throw new Error(
          `Feature flag with ID '${featureFlagId}' or user with ID '${userId}' not found`,
        );
      }

      const possibleFeature = await FeatureFlag.findOne({
        where: {
          name: featureFlag.toJSON().name,
          value,
        },
      });

      let newFeatureFlagId = null;

      if (possibleFeature) {
        newFeatureFlagId = possibleFeature.toJSON().id;
      } else {
        const newFeatureFlag = await FeatureFlag.create({
          description: value,
          name: featureFlag.toJSON().name,
          value,
        });
        newFeatureFlagId = newFeatureFlag.toJSON().id;
      }

      await UserFeatureFlag.destroy({
        where: {
          [Op.or]: [
            {
              featureFlagId,
            },
            {
              featureFlagId: newFeatureFlagId,
            },
          ],
        },
      });

      await UserFeatureFlag.create({
        createdDate: new Date(),
        featureFlagId: newFeatureFlagId,
        updatedDate: new Date(),
        userId,
      });

      return user.toJSON() as User;
    } catch (error) {
      logger.error(error.message);

      return null;
    }
  }
}
