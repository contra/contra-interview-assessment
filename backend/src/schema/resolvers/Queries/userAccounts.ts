import { sql } from 'slonik';
import { QueryResolvers } from '../../../generated/types';

// @ts-ignore
export const resolve: QueryResolvers['userAccounts'] = async (
  _parent,
  _args,
  { pool },
) => {
  const result = await pool.query(
    sql`
        SELECT
            ua.id,
            ua.given_name AS "givenName",
            ua.family_name AS "familyName",
            ua.email_address AS "emailAddress",
            ff.value,
            ff.id AS "featureFlagId"
        FROM user_accounts AS ua
        LEFT JOIN feature_flag_assignments AS ffa
            ON ffa.actor_id = ua.id
            AND ffa.actor_type = 'UserAccount'
        LEFT JOIN feature_flags AS ff
          ON ffa.feature_flag_id = ff.id
    `,
  );

  const processedResult = result.rows.reduce((acc: any, curr: any) => {
    const index = acc.findIndex((object: any) => {
      return object.id === curr.id;
    });

    if (acc[index]) {
      acc[index]['featureFlags'].push({
        id: curr.featureFlagId,
        value: curr.value,
      });

      return acc;
    }

    acc.push({
      ...curr,
      featureFlags: [{ id: curr.featureFlagId, value: curr.value }],
    });

    return acc;
  }, []);

  return processedResult;
};
