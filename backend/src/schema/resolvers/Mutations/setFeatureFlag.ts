import {
  MutationResolvers,
  SetFeatureFlagResponse,
  FeatureFlagData,
} from '../../../generated/types';
import { FeatureFlagPersistence } from '../FeatureFlagPersistence';
import { UserAccountPersistence } from '../UserAccountPersistence';

async function setFeatureFlag(
  pool: any,
  userId: number,
  flagData: FeatureFlagData,
): Promise<Boolean> {
  try {
    const userExists = await UserAccountPersistence.userExists(pool, userId);
    if (!userExists) return false;

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
    return false;
  }
  return true;
}

export const resolve: MutationResolvers['setFeatureFlag'] = async (
  _parent,
  _args,
  { pool },
) => {
  const { userIds, flagData } = _args;

  let response = {
    affectedUserIds: [],
    failedUserIds: [],
  } as SetFeatureFlagResponse;

  for (let userId of userIds) {
    const isSuccess = await setFeatureFlag(pool, userId, flagData);
    isSuccess
      ? response.affectedUserIds.push(userId)
      : response.failedUserIds.push(userId);
  }

  return response;
};
