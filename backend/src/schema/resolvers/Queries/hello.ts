import { QueryResolvers } from '../../../generated/types';

export const resolve: QueryResolvers['hello'] = async (
  _parent,
  _args,
  { pool },
) => {
  const result = await pool.raw(`SELECT 'world' as phrase`);
  return result.rows[0].phrase;
};
