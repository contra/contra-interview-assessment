import { sql } from 'slonik';
import type { queryFlagInput } from '../../../ResolverContextType';
import { Flag, QueryResolvers } from '../../../generated/types';

/*
* query database and return a single flag
*/
export const queryFlag: QueryResolvers['flag'] = async (
  _parent,
  args,
  { pool },
) => {
  const { flagId } = args as queryFlagInput;

  const flag = await pool.one<Flag>(
    sql`
      SELECT
        id,
        name,
        description,
        type,
        value,
        created_at,
        updated_at
      FROM 
        feature_flag
      WHERE 
        id = ${flagId}
    `,
  );

  return {
    ...flag,
    value: JSON.parse(flag.value as string),
  };
};

/*
* query database and return all flags
*/
export const queryFlags: QueryResolvers['flags'] = async (
  _parent,
  _args,
  { pool },
) => {
  const flags = await pool.many<Flag>(
    sql`
      SELECT
        id,
        name,
        description,
        type,
        value,
        created_at,
        updated_at
      FROM 
        feature_flag
    `,
  );

  return flags.map((flag: Flag) => ({
    ...flag,
    value: JSON.parse(flag.value as string),
  }));
};
