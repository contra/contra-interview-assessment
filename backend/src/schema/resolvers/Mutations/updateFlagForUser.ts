import { sql } from 'slonik';
import { MutationResolvers } from '../../../generated/types';

export const resolve: MutationResolvers['updateFlagForUser'] = async (
  _parent,
  { input },
  { pool },
) => {
  const flagDetails = await pool.one(
    sql`SELECT * from feature_flags where id = ${input.flagId}`,
  );
  if (flagDetails.isBoolean) {
    if (input.boolean_value === undefined) {
      throw new Error(`boolean_value is required for ${flagDetails.name}`);
    }
    await pool.query(
      sql`INSERT INTO feature_flags_user_map(feature_flag_id,user_id,flag_boolean)
       VALUES (${input.flagId},${input.userId},${input.boolean_value}) 
       ON CONFLICT(feature_flag_id,user_id) DO UPDATE SET flag_boolean = EXCLUDED.flag_boolean`,
    );

    return {
      booleanValue: input.boolean_value,
      id: input.flagId,
      multivariateValue: null,
      name: String(flagDetails.name),
    };
  } else {
    if (input.multivariate_value === undefined) {
      throw new Error(`multivariate_value is required for ${flagDetails.name}`);
    }
    await pool.query(
      sql`INSERT INTO feature_flags_user_map(feature_flag_id,user_id,flag_multivariate)
       VALUES (${input.flagId},${input.userId},${input.multivariate_value})
       ON CONFLICT(feature_flag_id,user_id) DO UPDATE SET flag_multivariate = EXCLUDED.flag_multivariate`,
    );

    return {
      booleanValue: null,
      id: input.flagId,
      multivariateValue: input.multivariate_value,
      name: String(flagDetails.name),
    };
  }
};
