import { sql, NotFoundError } from 'slonik';
import { UserResolvers, FeatureFlag } from '../../../generated/types';

export const resolve: UserResolvers['featureFlags'] = async (
  _parent,
  _args,
  { pool },
) => {
  let featureFlags;

  try {
    featureFlags = (await pool.many(
      sql`SELECT id, user_id as "userId", flag_key as "flagKey", flag_value as "flagValue" from public.feature_flag where user_id = ${_parent.id}`,
    )) as FeatureFlag[];
  } catch (err) {
    if (err instanceof NotFoundError) return [];
  }

  return featureFlags;
};
