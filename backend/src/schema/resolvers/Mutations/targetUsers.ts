import { sql } from 'slonik';
import { MutationResolvers, User } from '../../../generated/types';


export const targetUsers: MutationResolvers['targetUsers'] = async(
    _parent,
    { userIds, flag, value, environment },
    { pool },
  ) => {

    /**
     * We cannot have the same feature flag in the same environment attached to a user,
     * so remove any existing flags.
     */
    await pool.query(
        sql`DELETE FROM user_context
        USING context, feature_flag_variant, feature_flag
        WHERE 
        context_id=context.id 
        AND feature_flag_variant_id=feature_flag_variant.id
        AND feature_flag_id=feature_flag.id
        AND environment=${environment}
        AND name=${flag}
        AND user_id = ANY ( ${sql.array(userIds, 'int4')} )
        ;`
    );

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
	 * insert into user_context
	 */
    
    const rows = [];
    for (const id of userIds) {
        rows.push([id, context!.id])
    }
	await pool.query(
		sql`INSERT INTO user_context (user_id, context_id)
        SELECT *
        FROM ${sql.unnest(
            rows, ['int4', 'int4']
        )}
		;`
	);


    return [] as User[];
};