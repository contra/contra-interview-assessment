import { sql } from 'slonik';
import { MutationResolvers } from "../../../generated/types";

export const resolve: MutationResolvers['changeFlag'] =
async (_, { userId, featureFlagId, value }, { pool }) => {
    // Change the value of a user's feature flag
    await pool.query(sql`
    UPDATE feature_flags
    SET value = ${value}
    WHERE id = ${featureFlagId}
    `);
    return pool.one(sql`
    SELECT * FROM feature_flags WHERE id = ${featureFlagId}
    `);
}
