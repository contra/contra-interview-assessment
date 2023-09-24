import { MutationResolvers } from '../../../generated/types';
import { Roarr as log } from 'roarr';
import { targetUsersWithFlag } from '../../../data/flags';

export const targetUsers: MutationResolvers['targetUsers'] = async (
  _parent,
  args,
  { pool },
) => {
  const { flagId, usersIds, value } = args.input;
  log.info(args.input, 'Target Users Mutation');

  await targetUsersWithFlag(pool, usersIds, flagId, value);

  return {
    success: true,
  };
};
