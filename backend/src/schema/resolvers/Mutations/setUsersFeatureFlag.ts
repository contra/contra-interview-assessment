import { GraphQLError } from 'graphql';
import { MutationResolvers } from '../../../generated/types';

interface UserFlag {
  featureFlagId: string;
  userId: string;
}

export const setUsersFeatureFlag: MutationResolvers['setUsersFeatureFlag'] = async (
  _parent,
  { input },
  { db },
) => {
  const { userIds, featureFlagId, value } = input;

  // Check if feature flag exists, otherwise throw error
  const featureFlag = await db.featureFlag.findUnique({
    where: { id: featureFlagId },
  });
  if (!featureFlag) {
    throw new Error('Feature flag not found');
  }

  // Find existing user flags
  const existingUserFlags = await db.userFlag.findMany({
    select: {
      featureFlagId: true,
      userId: true,
    },
    where: {
      featureFlagId,
      userId: { in: userIds },
    },
  });

  // Create a map of user IDs to their existing user flags
  const userFlagsMap: Record<string, UserFlag> = existingUserFlags.reduce(
    (accumulator: Record<string, UserFlag>, userFlag) => {
      accumulator[userFlag.userId] = userFlag;

      return accumulator;
    },
    {},
  );

  // Build an array userFlagsToCreate and fill it with userIds excluding those who exists in the map from the prev step.
  const userFlagsToCreate = userIds
    .filter((userId) => !(userId in userFlagsMap))
    .map((userId) => ({
      featureFlagId,
      userId,
      value: value ?? true,
    }));

  // Bulk Create new UserFlag records in the database
  if (userFlagsToCreate.length > 0) {
    try {
      await db.userFlag.createMany({
        data: userFlagsToCreate,
      });
    } catch (error) {
      throw new GraphQLError(error);
    }
  }

  // this return type only for simplicity, in real-world application we can have more details returned
  return { success: true };
};
