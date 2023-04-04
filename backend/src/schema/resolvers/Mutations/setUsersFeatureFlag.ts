import { UserFlag } from '@prisma/client';
import { GraphQLError } from 'graphql';
import { MutationResolvers } from '../../../generated/types';
import { FeatureFlagService } from '../../../services/FeatureFlagService';

export const setUsersFeatureFlag: MutationResolvers['setUsersFeatureFlag'] = async (
  _parent,
  { input },
  { db },
) => {
  try {
    const { userIds, featureFlagId, value } = input;
    const featureFlagServics = new FeatureFlagService(db);

    // Check if feature flag exists, otherwise throw error
    await featureFlagServics.findFeatureFlag(featureFlagId);

    // Find existing user flags assocations
    const existingUserFlags = await featureFlagServics.findUsersFeatureFlags(
      userIds,
      featureFlagId,
    );

    // Create a map of user IDs to their existing user flags
    const userFlagsMap: Record<
      string,
      Partial<UserFlag>
    > = existingUserFlags.reduce(
      (accumulator: Record<string, Partial<UserFlag>>, userFlag) => {
        accumulator[userFlag.userId] = userFlag;

        return accumulator;
      },
      {},
    );

    /**
     * Build an array userFlagsToCreate and fill it with userIds,
     * excluding those who exists in the map from the prev step.
     */
    const userFlagsToCreate = userIds
      .filter((userId) => !(userId in userFlagsMap))
      .map((userId) => ({
        featureFlagId,
        userId,
        value: value ?? true,
      }));

    // Bulk Create new UserFlag records in the database
    if (userFlagsToCreate.length > 0) {
      await featureFlagServics.createUsersFeatureFlag(userFlagsToCreate);
    }

    // this return type only for simplicity, in real-world application we can have more details returned
    return { success: true };
  } catch (error) {
    throw new GraphQLError(error);
  }
};
