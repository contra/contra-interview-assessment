import { MutationResolvers } from '../../../generated/types';

export const resolve: MutationResolvers['sampleMutation'] = () => {
  return 'success';
};
