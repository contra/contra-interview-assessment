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

  // set the flag only for existing users
  if (existingUserIds && existingUserIds.length > 0) {
    const exisingUsersHaveFlag: number[] = await FeatureFlagPersistence.getUsersIdsHaveFlag(
      pool,
      existingUserIds,
      flagData.key,
    );

    if (exisingUsersHaveFlag && exisingUsersHaveFlag.length > 0) {
      try {
        // bulk update existing flag for users that have it
        await FeatureFlagPersistence.bulkUpdateFeatureFlag(
          pool,
          exisingUsersHaveFlag,
          flagData,
        );
        // all users were updated if you did not get an error until here
        response.affectedUserIds = exisingUsersHaveFlag;
      } catch (err) {
        response.failedUserIds = [
          ...response.failedUserIds,
          ...exisingUsersHaveFlag,
        ];
      }
    }

    const existingUsersNoFlag = existingUserIds.filter(
      (id) => !exisingUsersHaveFlag.includes(id),
    );

    if (existingUsersNoFlag && existingUsersNoFlag.length > 0) {
      try {
        // bulk create flag for users that do not have it
        await FeatureFlagPersistence.bulkCreateFeatureFlag(
          pool,
          existingUsersNoFlag,
          flagData,
        );
        response.affectedUserIds = [
          ...response.affectedUserIds,
          ...existingUsersNoFlag,
        ];
      } catch (err) {
        response.failedUserIds = [
          ...response.failedUserIds,
          ...existingUsersNoFlag,
        ];
      }
    }
  }

  return response;
};
