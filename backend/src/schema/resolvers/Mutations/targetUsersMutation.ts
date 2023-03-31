import { MutationResolvers } from "../../../generated/types";

export const resolve: MutationResolvers['targetUsers'] = async (
  _parent: any,
  _args: any,
  { pool }
) => {
  const values = _args.data.flatMap((arg: any) => {
    return arg.featureFlags.flatMap((featureFlag: any) => {
      return {
        user_id: arg.userId,
        feature_flag_id: featureFlag.id,
        override: featureFlag.override || null
      };
    });
  });

  const result = await pool.insert(values, ['*']).into('feature_flag_user');

  return result.map((row: any) => {
    return {
      userId: row.user_id,
      featureFlag: {
        id: row.feature_flag_id,
        override: row.override,
        createdAt: row.created_at,
        updatedAt: row.updated_at
      },
    }
  });
};
