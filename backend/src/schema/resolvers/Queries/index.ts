import { resolve as featureFlagsResolver } from './featureFlags';
import { resolve as hello } from './hello';
import { resolve as usersResolver } from './users';
import { resolve as featureFlagUserValuesResolver } from './featureFlagUserValues';

export const Query = {
  featureFlags: featureFlagsResolver,
  hello,
  users: usersResolver,
}

export const User = {
  featureFlags: featureFlagUserValuesResolver,
}