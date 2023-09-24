import { getAllFlags } from '../../../data/flags';
import { QueryResolvers } from '../../../generated/types';
import { parseFlagModel } from '../../../helpers/graphql';

export const queryFlags: QueryResolvers['flags'] = async (
  _parent,
  _args,
  { pool, log },
) => {
  log.info('Fetching feature flags');
  const flags = await getAllFlags(pool);

  log.info({ flags }, 'Flags results');

  return flags.map(parseFlagModel);
};
