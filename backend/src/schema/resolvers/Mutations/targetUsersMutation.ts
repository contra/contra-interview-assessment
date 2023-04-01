import Logger from "roarr";
import { FeatureFlagUser } from "../../../bin/models/feature-flag-user";
import { MutationResolvers } from "../../../generated/types";

const logger = Logger.child({ context: 'resolvers/Mutations/targetUsers' });

export const resolve: MutationResolvers['targetUsers'] = async (
  _parent: any,
  args: any,
  // @ts-ignore
  { repository, correlationId }
) => {
  logger.debug('Handling request to assign feature flags to users');

  const result: FeatureFlagUser[] = await repository.targetUsers({
    targets: args.data,
    correlationId
  });

  return result.map((row) => {
    return {
      userId: row.userId,
      featureFlag: {
        id: row.featureFlagId,
        value: row.override,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt
      }
    }
  })
};
