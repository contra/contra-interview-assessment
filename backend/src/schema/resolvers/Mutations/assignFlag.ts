import { MutationResolvers } from "../../../generated/types";
import { sql, DatabasePoolType } from 'slonik';

export const resolve: MutationResolvers['assignFlag'] =
async (_: undefined, { user_id, feature_flag_id }: { user_id: number, feature_flag_id: number }, { pool }: { pool: DatabasePoolType }) => {
    // Assign a feature flag to a user
    await pool.query(sql`
    INSERT INTO user_feature_flags (user_id, feature_flag_id)
    VALUES (${user_id}, ${feature_flag_id})
    ON CONFLICT DO NOTHING
    `);
    return pool.one(sql`
    SELECT * FROM users WHERE id = ${user_id}
    `);
}
