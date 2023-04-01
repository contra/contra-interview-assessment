import Logger from 'roarr';
import { MutationResolvers } from "../../../generated/types";

const logger = Logger.child({ context: 'resolvers/Mutations/updateUserFeatureFlag' });

/**
 * Updates a single users' feature flag value
 */
export const resolve: MutationResolvers['updateUserFeatureFlag'] = async (
  _parent: any,
  args: any,
  // @ts-ignore
  { repository, correlationId }
) => {
  logger.debug('Handling request to update a user\'s feature flag');

  const { userId, featureFlagId, value } = args.data;
  const result = await repository.updateUserFeatureFlag({
    userId,
    featureFlagId,
    value,
    correlationId
  })

  return {
    userId: result.userId,
    featureFlagId: result.featureFlagId,
    value: result.override,
    updatedAt: result.updatedAt
  }
}