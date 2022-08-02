// import { sql } from 'slonik';
import { QueryResolvers } from '../../../generated/types';

export const resolve: QueryResolvers['getAllFeatureFlags'] = async (
  _parent,
  _args,
) => {
  const mockFlag = {
    id: 1,
    userId: 1,
    flagKey: 'backgroundColor',
    flagValue: 'black',
  };
  return [mockFlag];
};
