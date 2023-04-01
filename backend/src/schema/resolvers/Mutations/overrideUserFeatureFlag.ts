import { FeatureFlagUser } from "../../../bin/models/feature-flag-user";
import { MutationResolvers } from "../../../generated/types";

export const resolve: MutationResolvers['overrideUserFeatureFlag'] = async (
  _parent: any,
  args: any,
) => {
  const { userId, featureFlagId, value } = args.data;

  const result = await FeatureFlagUser.query()
    .update({ override: value })
    .where({
      user_id: parseInt(userId),
      feature_flag_id: parseInt(featureFlagId)
    })
    .returning('*')
    .first();

  return {
    userId: result.userId,
    featureFlagId: result.featureFlagId,
    value: result.override,
    updatedAt: result.updatedAt
  }
}