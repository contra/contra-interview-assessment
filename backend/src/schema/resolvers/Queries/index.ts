import { featureFlagAssociations } from './featureFlagAssociations';
import { resolve as hello } from './hello';
import { userAccounts } from './userAccounts';

export const Query = {
  hello,
  userAccounts,
};

// Field resolver used to resolve feature flag associations
export const UserAccount = {
  featureFlagAssociations
};