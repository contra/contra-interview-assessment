import { MutationResolvers } from '../../../generated/types';
import { Roarr as log } from 'roarr';
import { updateUserFlagValue } from '../../../data/flags';

export const updateFlagForUser: MutationResolvers['updateFlagForUser'] = async (
  _parent,
  args,
  { pool },
) => {
  const { flagId, userId, value } = args.input;
  log.info(args.input, 'Update Tag for user Mutation');

  await updateUserFlagValue(pool, userId, flagId, value);

  return {
    success: true,
  };
};
