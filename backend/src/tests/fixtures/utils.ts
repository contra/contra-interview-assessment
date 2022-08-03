import { createPool, sql } from 'slonik';
// @ts-ignore
import { createInterceptors } from 'slonik-interceptor-preset';

const pool = createPool(process.env.POSTGRES_CONNECTION_STRING, {
  captureStackTrace: false,
  connectionTimeout: 60 * 1_000,
  interceptors: createInterceptors(),
});

export const cleanDB = async () => {
  await pool.query(sql`DELETE FROM feature_flags_user_map`);
  await pool.query(sql`DELETE FROM feature_flags`);
  await pool.query(sql`DELETE FROM user_account`);
  // NB: I tried iterating to to generate sql statement with sql directly as sql`DELETE FROM ${table}`
  // but I was finding it difficult to figure out the issue from slonik as it parses and send the string quotes along with the query
};

export const createUserAccount = async (name, familyName, email) => {
  const { rows: user } = await pool.query(
    sql`INSERT INTO user_account (given_name, family_name, email_address) VALUES 
    (${name}, ${familyName}, ${email}) returning *`,
  );

  return user[0];
};

export const insertFeatureFlag = async (name, isBoolean, value) => {
  const { rows: featureFlag } = await pool.query(
    sql`INSERT INTO feature_flags (name, is_boolean, default_value) VALUES 
    (${name}, ${isBoolean}, ${value}) returning *`,
  );

  return featureFlag[0];
};

export const getFlagValueForUser = async (userId, flagId) => {
  const flagDetails = await pool.one(
    sql`SELECT * FROM feature_flags WHERE id = ${flagId}`,
  );
  const flagUserMap = await pool.one(
    sql`SELECT * FROM feature_flags_user_map WHERE user_id = ${userId} AND feature_flag_id = ${flagId}`,
  );
  if (flagUserMap) {
    return {
      booleanValue: flagDetails.isBoolean ? flagUserMap.flagBoolean : null,
      multivariateValue: flagDetails.isBoolean
        ? null
        : flagUserMap.flagMultivariate,
    };
  } else {
    return {
      booleanValue: flagDetails.defaultValue === 'TRUE',
      multivariateValue: flagDetails.defaultValue,
    };
  }
};
