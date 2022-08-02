import { MutationResolvers, UpdateResponse } from '../../../generated/types';
import { FeatureFlagPersistence } from '../FeatureFlagPersistence';
import { UserAccountPersistence } from '../UserAccountPersistence';

export const resolve: MutationResolvers['setUserFeatureFlag'] = async (
  _parent,
  _args,
  { pool },
) => {
  const { userId, flagData } = _args;

  try {
    const userExists = await UserAccountPersistence.userExists(pool, userId);
    if (!userExists) return { success: false } as UpdateResponse;

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
