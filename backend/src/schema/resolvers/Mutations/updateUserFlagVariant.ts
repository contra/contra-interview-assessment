import { GraphQLError } from 'graphql';
import { MutationResolvers } from '../../../generated/types';

export const updateUserFlag: MutationResolvers['updateUserFlag'] = async (
  _parent,
  { input },
  { db },
) => {
  try {
    const { featureFlagId, userId, value } = input;
    // Fetch the user-flag that needs to be updated
    const userFlag = await db.userFlag.findUnique({
      where: { userId_featureFlagId: { featureFlagId, userId } },
    });

    if (!userFlag) {
      throw new GraphQLError(
        `User flag with userId ${userId} and featureFlagId ${featureFlagId} not found`,
      );
    }
    // Update the variant value of the user flag
    await db.userFlag.update({
      data: {
        value,
      },
      where: {
        userId_featureFlagId: { featureFlagId, userId },
      },
    });

    // this return type only for simplicity, in real-world application we can have more details returned
    return { success: true };
  } catch (error) {
    throw new GraphQLError(error);
  }
};
