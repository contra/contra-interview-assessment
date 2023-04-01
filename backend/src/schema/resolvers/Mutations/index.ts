import { resolve as overrideUserFeatureFlag } from './overrideUserFeatureFlag';
import { resolve as targetUsers } from './targetUsersMutation';

export const Mutation = {
  targetUsers,
  overrideUserFeatureFlag
};
