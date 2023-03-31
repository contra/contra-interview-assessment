import { MutationResolvers } from '../../../generated/types';
import { FeatureFlagService } from '../../../services/featureFlagService';
import { FeatureFlag, User } from '../../../utils/sequelize/models';

// @ts-ignore
export const targetUsers: MutationResolvers['targetUsers'] = async (
  _: never,
  args: { featureFlagId: string; userIds: string[] },
) => {
  const userService = new FeatureFlagService();
  const result = await userService.targetUsers(
    args.featureFlagId,
    args.userIds,
  );

  return (result as unknown) as FeatureFlag[];
};

// @ts-ignore
export const updateUserFeatureFlag: MutationResolvers['updateUserFeatureFlag'] = async (
  _: never,
  args: { featureFlagId: string; userId: string; value: string },
) => {
  const userService = new FeatureFlagService();
  const result = await userService.updateUserFeatureFlag(
    args.featureFlagId,
    args.userId,
    args.value,
  );

  return (result as unknown) as User;
};
