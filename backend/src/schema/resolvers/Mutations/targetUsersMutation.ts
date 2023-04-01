import { FeatureFlagUser } from "../../../bin/models/feature-flag-user";
import { MutationResolvers } from "../../../generated/types";

export const resolve: MutationResolvers['targetUsers'] = async (
  _parent: any,
  _args: any,
) => {
  const values = _args.data.flatMap((arg: any) => {
    return arg.featureFlags.flatMap((featureFlag: any) => {
      return {
        user_id: parseInt(arg.userId),
        feature_flag_id: parseInt(featureFlag.id),
        override: featureFlag.value || null
      };
    });
  });

  // @ts-ignore
  const result: FeatureFlagUser[] = await FeatureFlagUser.query().insert(values).returning('*');

  return result.map((row) => {
    console.log(row);
    return {
      userId: row.userId,
      featureFlag: {
        id: row.featureFlagId,
        value: row.override,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt
      }
    }
  });
};
