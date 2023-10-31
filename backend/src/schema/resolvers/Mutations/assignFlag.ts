import { MutationResolvers } from "../../../generated/types";
import { sql } from 'slonik';

export const assignFlag: MutationResolvers['assignFlag'] = async (
    _parent,
    _args,
    { pool }
) => {
    // Assign a feature flag to a user user_id and feature_flag_id are passed in as arguments in production
    await pool.query(sql`
    INSERT INTO user_feature_flags (user_id, feature_flag_id)
    VALUES (1, 1)
    ON CONFLICT DO NOTHING
    `);
    return pool.one(sql`
    SELECT * FROM users WHERE id = 1
    `);
}
