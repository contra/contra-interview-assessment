import { GraphQLError } from 'graphql';
import { QueryResolvers } from '../../../generated/types';
import { FeatureFlagService } from '../../../services/FeatureFlagService';

export const getFeatureFlags: QueryResolvers['getFeatureFlags'] = async (
  _parent,
  _args,
  { db },
) => {
  try {
    const featureFlags = await new FeatureFlagService(db).findAllFeatureFlags();

    return featureFlags;
  } catch (error) {
    throw new GraphQLError(error);
  }
};
