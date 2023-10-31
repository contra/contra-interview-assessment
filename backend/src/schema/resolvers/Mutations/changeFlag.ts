import { sql } from 'slonik';
import { MutationResolvers } from "../../../generated/types";

export const changeFlag: MutationResolvers['changeFlag'] = async (
    _parent,
    _args,
    { pool }
) => {
    // Change the value of a user's feature flag - value and feature flag id are passed in as arguments in production
    await pool.query(sql`
    UPDATE feature_flags
    SET value = flag1
    WHERE id = 1
    `);
    return pool.one(sql`
    SELECT * FROM feature_flags WHERE id = 1
    `);
}
