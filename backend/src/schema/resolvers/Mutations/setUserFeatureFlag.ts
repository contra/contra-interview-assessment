import { MutationResolvers, UpdateResponse } from '../../../generated/types';
import { FeatureFlagPersistence } from '../FeatureFlagPersistence';

export const resolve: MutationResolvers['setUserFeatureFlag'] = async (
  _parent,
  _args,
  { pool },
) => {
  const { userId, flagData } = _args;

  try {
    const featureFlagExists = await FeatureFlagPersistence.doesFeatureFlagExist(
      pool,
      userId,
      flagData,
    );

    if (featureFlagExists) {
      await FeatureFlagPersistence.updateFeatureFlag(pool, userId, flagData);
    } else {
      await FeatureFlagPersistence.createFeatureFlag(pool, userId, flagData);
    }
  } catch (err) {
    console.error(err);
    return { success: false } as UpdateResponse;
  }

  return { success: true } as UpdateResponse;
};
