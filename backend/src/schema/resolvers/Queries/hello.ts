import { sql } from 'slonik';
import { QueryResolvers } from '../../../generated/types';

export const resolve: QueryResolvers['hello'] = async (
  _parent,
  _args,
  { pool },
) => {
  
  const result = await pool.one<{ phrase: string }>(
    sql`SELECT 'world' as phrase;`,
  );

  return result.phrase;
};
