import { getUserFlags } from '../../../data/flags';
import { Flag, UserResolvers } from '../../../generated/types';
import { parseFlagModel } from '../../../helpers/graphql';

export const userFlags: UserResolvers['flags'] = async (
  user,
  _args,
  { pool, log },
): Promise<Flag[]> => {
  log.info({ user }, 'Resolving user flags');

  const flags = await getUserFlags(pool, user.id);

  log.debug({ flags }, 'FLAGS');

  return flags.map(parseFlagModel);
};
