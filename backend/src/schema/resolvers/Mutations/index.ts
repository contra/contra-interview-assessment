import { MutationResolvers } from '../../../generated/types';
import { sql } from 'slonik';

const Mutation: MutationResolvers = {
  addTargetedUsers: async (_parent, { userId, featureFlagId, value }, { pool }) => {
    const newAssignment = await pool.any(
      sql`
      INSERT INTO feature_flag_assignments (user_id, feature_flag_id, value)
      VALUES (${userId}, ${featureFlagId}, ${value})
      RETURNING *;
    `, [userId, featureFlagId, value]);

    return newAssignment[0];
  },

  updateFeatureFlagValue: async (_parent, { userId, featureFlagId, value }, { pool }) => {
    const updatedAssignment = await pool.any(sql`
      UPDATE feature_flag_assignments
      SET value = ${value}
      WHERE user_id = ${userId} AND feature_flag_id = ${featureFlagId}
      RETURNING *
    `, [userId, featureFlagId, value]);

    console.log(updatedAssignment)

    return updatedAssignment[0]
  },
};

export default Mutation;