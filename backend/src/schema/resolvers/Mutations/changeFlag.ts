import { sql, DatabasePoolType } from 'slonik';
import { MutationResolvers } from "../../../generated/types";

export const resolve: MutationResolvers['changeFlag'] =
async (_: number, { feature_flag_id, value }: { feature_flag_id: number, value: number }, { pool }: { pool: DatabasePoolType }) => {
    // Change the value of a user's feature flag
    await pool.query(sql`
    UPDATE feature_flags
    SET value = ${value}
    WHERE id = ${feature_flag_id}
    `);
    return pool.one(sql`
    SELECT * FROM feature_flags WHERE id = ${feature_flag_id}
    `);
}
