import { NotFoundError, sql } from 'slonik';
import { FeatureFlag, QueryResolvers } from '../../../generated/types';

export const resolve: QueryResolvers['getUserFeatureFlags'] = async (
  _parent,
  _args,
  { pool }
) => {
  try {
    const result = await pool.many(
      sql`SELECT u.id as id, u.given_name, u.family_name, u.email_address, 
      COALESCE(json_agg(json_build_object(
        'featureId', f.id,
        'name', f.feature_name,
        'value', uf.flag
      )) FILTER (WHERE f.id IS NOT NULL), '[]'::json) as features
      FROM user_account u
      LEFT JOIN user_feature_flag uf ON uf.user_id = u.id
      LEFT JOIN feature f ON uf.feature_id = f.id
      GROUP BY u.id;
      `
    );

    return result.map((row) => ({
      emailAddress: <string>row.emailAddress,
      familyName: <string>row.familyName,
      features: <FeatureFlag[]><unknown>row.features,
      givenName: <string>row.givenName,
      id: <string>row.id
    }));
  } catch (error) {
    if (error instanceof NotFoundError) {
      return [];
    }

    throw new Error('Could not get users');
  }
};
