// import Logger from 'roarr';
import { UserInputError } from 'apollo-server-fastify';
import { sql } from 'slonik';
import { MutationResolvers } from '../../../generated/types';

// const log = Logger.child({ context: 'bin/server' });

export const resolve: MutationResolvers['setFlagForUsers'] = async (
  _parent,
  { input },
  { pool },
) => {
  const flagDetails = await pool.one(
    sql`SELECT * from feature_flags where id = ${input.flagId}`,
  );
  if (flagDetails.isBoolean) {
    if (input.boolean_value === undefined) {
      throw new UserInputError(`${flagDetails.name} is of type boolean`);
    }
    const transformedInput = input.userIds?.map((userId) => [
      input.flagId,
      userId,
      input.boolean_value,
    ]);
    await pool.query(
      sql`INSERT INTO feature_flags_user_map(feature_flag_id,user_id,flag_boolean) 
      SELECT * from ${sql.unnest(transformedInput || [[]], [
        'int4',
        'int4',
        'bool',
      ])} ON CONFLICT(feature_flag_id,user_id) DO UPDATE SET 
      flag_boolean = EXCLUDED.flag_boolean`,
    );

    return {
      booleanValue: input.boolean_value,
      flagName: String(flagDetails.name),
      multivariateValue: input.multivariate_value,
      success: true,
      userIds: input.userIds,
    };
  } else {
    if (input.multivariate_value === undefined) {
      throw new UserInputError(`${flagDetails.name} is of type multivariate`);
    }
    const transformedInput = input.userIds?.map((userId) => [
      input.flagId,
      userId,
      input.multivariate_value,
    ]);
    await pool.query(
      sql`INSERT INTO feature_flags_user_map(feature_flag_id,user_id,flag_multivariate) 
      SELECT * from ${sql.unnest(transformedInput || [[]], [
        'int4',
        'int4',
        'text',
      ])} ON CONFLICT(feature_flag_id,user_id) DO UPDATE SET 
      flag_multivariate = EXCLUDED.flag_multivariate`,
    );

    return {
      booleanValue: input.boolean_value,
      flagName: String(flagDetails.name),
      multivariateValue: input.multivariate_value,
      success: true,
      userIds: input.userIds,
    };
  }
};
