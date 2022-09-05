import { UserFeatureFlag } from '../../generated/types';
import { FeatureFlagValueType } from '../../schema/resolvers/Scalars';

const FEATURE_FLAG_TYPES = ['boolean', 'string', 'number', 'object'];

export function isValidFeatureFlag(value: any): boolean {
  return value !== null && FEATURE_FLAG_TYPES.includes(typeof value);
}

export function parseFeatureFlagValue(json: string): FeatureFlagValueType {
  const parsedFeatureFlag = JSON.parse(json);

  if (!isValidFeatureFlag(parsedFeatureFlag)) {
    throw new Error('Could not assert provided Feature Flag');
  }
  return parsedFeatureFlag as FeatureFlagValueType;
}

export function mapUsersFeatureFlags(
  usersFeatureFlags: readonly UserFeatureFlag[],
): Map<number, UserFeatureFlag[]> {
  return usersFeatureFlags.reduce(
    (acc: Map<number, UserFeatureFlag[]>, cur) => {
      if (!acc.has(cur.userId)) {
        acc.set(cur.userId, [
          {
            userId: cur.userId,
            featureFlagKey: cur.featureFlagKey,
            featureFlagValue: parseFeatureFlagValue(cur.featureFlagValue),
          },
        ]);
        return acc;
      }

      acc.get(cur.userId)!.push({
        userId: cur.userId,
        featureFlagKey: cur.featureFlagKey,
        featureFlagValue: parseFeatureFlagValue(cur.featureFlagValue),
      });
      return acc;
    },
    new Map<number, UserFeatureFlag[]>(),
  );
}

export function userFeatureFlagsMapToUserFeatureFlagResponse(
  userIds: readonly number[],
  userFeatureFlagsMap: Map<number, UserFeatureFlag[]>,
): UserFeatureFlag[][] {
  return userIds.map((userId) => userFeatureFlagsMap.get(userId) ?? []);
}
