import { MutationResolvers, UpdateResponse } from '../../../generated/types';
import { FeatureFlagPersistence } from '../FeatureFlagPersistence';

export const resolve: MutationResolvers['setUserFeatureFlag'] = async (
  _parent,
  { userId, flagData },
  { pool },
) => {
  try {
    const isSuccess = await FeatureFlagPersistence.setFeatureFlag(
      pool,
      userId,
      flagData,
    );
    return { success: isSuccess } as UpdateResponse;
  } catch (err) {
    console.error(err);
    return { success: false } as UpdateResponse;
  }
};
