import { FeatureFlag, QueryResolvers } from '../../../generated/types';
import { FeatureFlagService } from '../../../services/featureFlagService';

export const featureFlags: QueryResolvers['featureFlags'] = async () => {
  const featureFlagService = new FeatureFlagService();
  const result = await featureFlagService.getFeatureFlags();

  return (result as unknown) as FeatureFlag[];
};

// @ts-ignore
export const featureFlag: QueryResolvers['featureFlag'] = async (
  _: never,
  args: { id: string },
) => {
  const featureFlagService = new FeatureFlagService();
  const result = await featureFlagService.getFeatureFlagById(args.id);

  return (result as unknown) as FeatureFlag;
};
