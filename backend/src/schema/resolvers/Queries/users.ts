import { QueryResolvers } from '../../../generated/types';

/**
 * Return list of all users along with the associated feature flags
 */
export const resolve: QueryResolvers['users'] = async (
  _parent,
  _args,
  // @ts-ignore
  { repository, correlationId }
) => {
  // another way is to issue 3 queries. depending on the load, it can actually
  // be beneficial.
  const results = await repository.getAllUsers({ correlationId });
  return results;
};
