import * as _ from 'lodash';
import { sql } from 'slonik';
import { QueryResolvers } from '../../../generated/types';

export const resolve: QueryResolvers['getAllUsersFlags'] = async (
  _parent,
  _args,
  { pool },
) => {
  const { rows: users } = await pool.query(sql`select * from user_account`);
  const { rows: featureFlags } = await pool.query(
    sql`select * from feature_flags`,
  );
  const { rows: featureFlagMaps } = await pool.query(
    sql`SELECT * FROM feature_flags_user_map`,
  );

  const result = users.map((user: any) => {
    const userFlags = featureFlags.map((flag: any) => {
      const flagMap = _.find(featureFlagMaps, {
        feature_flag_id: flag.id,
        user_id: user.id,
      });
      if (flagMap) {
        return {
          booleanValue: flag.isBoolean ? Boolean(flagMap.flag_boolean) : null,
          id: Number(flag.id),
          multivariateValue: flag.isBoolean
            ? null
            : String(flagMap.flagMultivariate),
          name: String(flag.name),
        };
      } else {
        return {
          booleanValue: flag.isBoolean ? flag.defaultValue === 'TRUE' : null,
          id: Number(flag.id),
          multivariateValue: flag.isBoolean ? null : String(flag.defaultValue),
          name: String(flag.name),
        };
      }
    });

    return {
      featureFlags: userFlags,
      name: String(user.givenName),
      userId: Number(user.id),
    };
  });

  return result || [];
};
