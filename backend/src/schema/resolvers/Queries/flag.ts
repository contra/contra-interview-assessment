import { getFlag } from '../../../data/flags';
import { QueryResolvers } from '../../../generated/types';
import { parseFlagModel } from '../../../helpers/graphql';

export const queryFlag: QueryResolvers['flag'] = async (
  _parent,
  args,
  { pool, log },
) => {
  log.info(args, 'Query flag by id');

  const flag = await getFlag(pool, args.flagId);

  return parseFlagModel(flag);
};
