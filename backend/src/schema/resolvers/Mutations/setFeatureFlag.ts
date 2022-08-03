import {
  MutationResolvers,
  SetFeatureFlagResponse,
} from '../../../generated/types';
import { FeatureFlagPersistence } from '../FeatureFlagPersistence';
import { UserAccountPersistence } from '../UserAccountPersistence';

export const resolve: MutationResolvers['setFeatureFlag'] = async (
  _parent,
  { userIds, flagData },
  { pool },
) => {
  let response = {
    affectedUserIds: [],
    failedUserIds: [],
  } as SetFeatureFlagResponse;

  if (userIds.length === 0) return response;

  let existingUserIds: number[] = (
    await UserAccountPersistence.getUsersByIds(pool, userIds)
  ).map((user) => user.id as number);

  // mark non existing users as failed
  response.failedUserIds = userIds.filter(
    (id) => !existingUserIds.includes(id),
  );

  for (let userId of existingUserIds) {
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
