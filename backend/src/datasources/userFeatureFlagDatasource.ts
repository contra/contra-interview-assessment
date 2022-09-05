import DataLoader from 'dataloader';
import { CommonQueryMethodsType, sql } from 'slonik';
import {
  mapUsersFeatureFlags,
  parseFeatureFlagValue,
  userFeatureFlagsMapToUserFeatureFlagResponse,
} from './adapters';
import {
  SetUsersFeatureFlagResponse,
  UserFeatureFlag,
} from '../generated/types';
import { FeatureFlagValueType } from '../schema/resolvers/Scalars';

export interface IUserFeatureFlagDatasource {
  getUserFeatureFlags: DataLoader<number, UserFeatureFlag[], number>;
  setUsersFeatureFlag: (
    userIds: number[],
    feature_flag_key: string,
    feature_flag_value: FeatureFlagValueType,
  ) => Promise<SetUsersFeatureFlagResponse[]>;
}

export class UserFeatureFlagDatasource implements IUserFeatureFlagDatasource {
  constructor(private dbConn: CommonQueryMethodsType) {}

  public getUserFeatureFlags = new DataLoader(
    async (userIds: readonly number[]) => {
      const query = sql<UserFeatureFlag>`
        SELECT ua.id as user_id, ff.feature_flag_key, uff.feature_flag_value
        FROM user_account ua
        INNER JOIN user_feature_flag uff
        ON uff.user_id = ua.id
        INNER JOIN feature_flag ff
        ON uff.feature_flag_id = ff.id
        WHERE ua.id IN (${sql.join(userIds, sql`,`)});
      `;

      return this.dbConn.many(query).then((result) => {
        const userFeatureFlagsMap = mapUsersFeatureFlags(result);
        const userFeatureFlags = userFeatureFlagsMapToUserFeatureFlagResponse(
          userIds,
          userFeatureFlagsMap,
        );
        return userFeatureFlags;
      });
    },
  );

  public async setUsersFeatureFlag(
    userIds: number[],
    featureFlagKey: string,
    featureflagValue: FeatureFlagValueType,
  ): Promise<SetUsersFeatureFlagResponse[]> {
    const flagValueString = JSON.stringify(featureflagValue);

    const insertquery = sql<UserFeatureFlag>`
    INSERT INTO user_feature_flag (feature_flag_id, user_id, feature_flag_value)
    SELECT ff.id  AS feature_flag_id, ua.id AS user_id, ${flagValueString} AS feature_flag_value
    FROM feature_flag ff
    LEFT JOIN user_account ua ON ua.id IN (${sql.join(userIds, sql`, `)})
    WHERE ff.feature_flag_key = ${featureFlagKey}
    ON CONFLICT (feature_flag_id, user_id)
    DO UPDATE SET feature_flag_value = ${flagValueString}
    RETURNING user_feature_flag.user_id, ${featureFlagKey} as feature_flag_key, user_feature_flag.feature_flag_value;
    `;

    return this.dbConn.any(insertquery).then((results) => {
      return results.map((uff) => ({
        userFeatureFlag: {
          userId: uff.userId,
          featureFlagKey: uff.featureFlagKey,
          featureFlagValue: parseFeatureFlagValue(uff.featureFlagValue),
        },
      }));
    });
  }
}
