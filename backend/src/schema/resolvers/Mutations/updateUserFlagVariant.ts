import { GraphQLError } from 'graphql';
import { MutationResolvers } from '../../../generated/types';
import { FeatureFlagService } from '../../../services/FeatureFlagService';

export const updateUserFlag: MutationResolvers['updateUserFlag'] = async (
  _parent,
  { input },
  { db },
) => {
  try {
    const { featureFlagId, userId } = input;
    const featureFlagServics = new FeatureFlagService(db);

    // check if user flag with userId and featureFlagId do exists
    await featureFlagServics.findUserFeatureFlags(userId, featureFlagId);

    // Update the feature flag value of a specific user
    await featureFlagServics.updateUsersFeatureFlag(input);

    // this return type only for simplicity, in real-world application we can have more details returned
    return { success: true };
  } catch (error) {
    throw new GraphQLError(error);
  }
};
