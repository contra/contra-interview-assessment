import {sql} from "slonik";
import {DatabaseTransactionConnectionType} from "slonik/src/types";
import {MutationResolvers} from '../../../generated/types';

const upsertFlag = async (pool: DatabaseTransactionConnectionType, userId: number, flag: string, value: unknown) => {
  const existing = await pool.maybeOne(
    sql`SELECT * FROM feature_flag WHERE user_id=${userId} AND name=${flag};`
  );

  const flagValue = JSON.stringify(value);
  if (!existing) {
    await pool.query(
      sql`INSERT INTO feature_flag (user_id, name, value) VALUES (${userId}, ${flag}, ${flagValue});`
    );
  } else if (JSON.stringify(existing.value) !== flagValue) {
    await pool.query(
      sql`UPDATE feature_flag SET value=${flagValue} WHERE user_id = ${userId} AND name = ${flag};`
    );
  }
}

export const resolve: MutationResolvers['assignFlag'] = async (
  _parent,
  {userIds, flag, value},
  {pool},
) => {

  await pool.transaction(async (connection: DatabaseTransactionConnectionType) => {
    let userId: number | undefined;
    while((userId = userIds.pop()) !== undefined){
      await upsertFlag(connection, userId, flag, value)
    }
  });

  return true;
};
