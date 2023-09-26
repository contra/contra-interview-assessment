import { JsonSqlTokenType, sql } from 'slonik';
import type {
  UpdateFlagForUserInput,
  TargetUsersInput,
  Flag,
} from '../../../ResolverContextType';
import { MutationResolvers } from '../../../generated/types';

/*
* assign a flag to a list of specified users
*/
export const targetUsers: MutationResolvers['targetUsers'] = async (
  _parent,
  args,
  { pool },
) => {
  const { flagId, userIds, value } = args.input as TargetUsersInput;

  const nowTimestamp = new Date().toISOString();

  const fields = [sql`user_id`, sql`flag_id`, sql`updated_at`];
  if (value) {
    fields.push(sql`value`);
  }

  const inserValues = userIds.map((userId: number) => {
    const values: (number | string | JsonSqlTokenType)[] = [
      userId,
      flagId,
      nowTimestamp,
    ];
    if (value) {
      values.push(sql.json(value));
    }

    return sql`(${sql.join(values, sql`, `)})`;
  });

  await pool.any<Flag>(
    sql` 
      INSERT INTO 
        user_feature_flag (${sql.join(fields, sql`,`)})
      VALUES 
        ${sql.join(inserValues, sql`, `)}
      ON CONFLICT (user_id, flag_id) DO UPDATE SET 
        value = EXCLUDED.value, 
        updated_at = EXCLUDED.updated_at
    `,
  );

  return {
    success: true,
  };
};

/*
* update a flag for a specified user
*/
export const updateFlagForUser: MutationResolvers['updateFlagForUser'] = async (
  _parent,
  args,
  { pool },
) => {
  const { flagId, userId, value } = args.input as UpdateFlagForUserInput;

  const nowTimestamp = new Date().toISOString();
 
  await pool.query<Flag>(
    sql` 
      UPDATE 
        user_feature_flag
      SET 
        value = ${sql.json(value)}, 
        updated_at = ${nowTimestamp}
      WHERE 
        user_id = ${userId} 
      AND 
        flag_id = ${flagId}
    `,
  );

  return {
    success: true,
  };
};
