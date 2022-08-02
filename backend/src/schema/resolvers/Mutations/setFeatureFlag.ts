import {
  MutationResolvers,
  SetFeatureFlagResponse,
} from '../../../generated/types';
import { FeatureFlagPersistence } from '../FeatureFlagPersistence';

export const resolve: MutationResolvers['setFeatureFlag'] = async (
  _parent,
  { userIds, flagData },
  { pool },
) => {
  let response = {
    affectedUserIds: [],
    failedUserIds: [],
  } as SetFeatureFlagResponse;

  for (let userId of userIds) {
    const isSuccess = await FeatureFlagPersistence.setFeatureFlag(
      pool,
      userId,
      flagData,
    );
    isSuccess
      ? response.affectedUserIds.push(userId)
      : response.failedUserIds.push(userId);
  }

  return response;
};
