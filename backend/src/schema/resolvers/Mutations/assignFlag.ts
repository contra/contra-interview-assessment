import { sql } from 'slonik';
import { MutationResolvers } from "../../../generated/types";

export const resolve: MutationResolvers['assignFlag'] =
async (_: undefined, { userId, featureFlagId }, { pool }) => {
    // Assign a feature flag to a user
    await pool.query(sql`
    INSERT INTO user_feature_flags (user_id, feature_flag_id)
    VALUES (${userId}, ${featureFlagId})
    ON CONFLICT DO NOTHING
    `);
    return pool.one(sql`
    SELECT * FROM users WHERE id = ${userId}
    `);
}
