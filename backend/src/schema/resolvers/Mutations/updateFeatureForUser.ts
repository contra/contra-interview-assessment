import { sql } from 'slonik';
import { MutationResolvers } from '../../../generated/types';

export const updateFeatureForUser: MutationResolvers['updateFeatureForUser'] = async(
  _parent,
  { userId, flag, value, environment },
  { pool },
) => {
  
  /**
   * First we need to make sure we only have one user assigned to this context. 
   * Otherwise we are not allowed to edit.
   */
  const user_contexts = await pool.any(
    sql`SELECT user_context.id as id, user_id, feature_flag_id FROM user_context
    INNER JOIN context
      ON context_id=context.id
    INNER JOIN feature_flag_variant
      ON feature_flag_variant_id=feature_flag_variant.id
    INNER JOIN feature_flag
      ON feature_flag_id=feature_flag.id
    WHERE environment=${environment}
    AND name=${flag}
    ;`
  );

  if (user_contexts.length > 1) {
    throw new Error(`Flag has been assigned to ${user_contexts.length} users. You cannot edit this value for this user only`);
  }
  if (user_contexts.length === 0 || user_contexts[0].userId !== userId) {
    throw new Error(`Flag not found for User(${userId})`);
  }

  /**
   * Find correct variant for the given value
   */
  const variant = await pool.maybeOne(
    sql`SELECT feature_flag_variant.id as id FROM feature_flag_variant
    INNER JOIN feature_flag
      ON feature_flag_id=feature_flag.id
    WHERE name=${flag} AND flag_value=${value}
    ;`
  );

  if (variant === null) {
    throw new Error(`Illegal value(${value}) for flag ${flag}`);
  }

  /**
   * Find existing context
   */
  let context = await pool.maybeOne(
    sql`SELECT id FROM context
    WHERE environment=${environment}
    AND feature_flag_variant_id=${variant.id}
    ;`
  );
  
  /**
   * If context doesn't exist create one
   */
  if (context === null) {
    context = await pool.one(
      sql`INSERT INTO context (feature_flag_variant_id, environment, context_enabled)
      VALUES (${variant.id}, ${environment}, TRUE) RETURNING id
      ;`
    );
  }

  /**
   * Update user_context
   */

  await pool.query(
    sql`UPDATE user_context SET context_id=${context!.id} WHERE id=${user_contexts[0].id};`
  )

  return user_contexts[0].id as number;
};
