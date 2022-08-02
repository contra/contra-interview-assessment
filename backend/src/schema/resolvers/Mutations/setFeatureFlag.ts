import {
  MutationResolvers,
  UpdateResponse,
  FeatureFlagData,
} from '../../../generated/types';
import { FeatureFlagPersistence } from '../FeatureFlagPersistence';

async function setFeatureFlag(
  pool: any,
  userId: number,
  flagData: FeatureFlagData,
) {
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
}

export const resolve: MutationResolvers['setFeatureFlag'] = async (
  _parent,
  _args,
  { pool },
) => {
  const { userIds, flagData } = _args;

  try {
    for (let userId of userIds) {
      await setFeatureFlag(pool, userId, flagData);
    }
  } catch (err) {
    console.error(err);
    return { success: false } as UpdateResponse;
  }

  return { success: true } as UpdateResponse;
};
