import { QueryResolvers } from '../../../generated/types';

export const resolve: QueryResolvers['hello'] = async (
  _parent,
  _args,
  { pool },
) => {
  const result: { phrase: string }[] = await pool.$queryRaw`SELECT 'world' as phrase`;

  return result?.[0].phrase ?? '';
};
