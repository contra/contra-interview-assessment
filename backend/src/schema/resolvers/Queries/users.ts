import { UserAccount } from '../../../bin/models/user-account';
import { QueryResolvers } from '../../../generated/types';


/**
 * Return list of all users along with the associated feature flags
 */
export const resolve: QueryResolvers['users'] = async (
  _parent,
  _args,
) => {
  // another way is to issue 3 queries. depending on the load, it can actually
  // be beneficial.
  const results = await UserAccount.query().withGraphFetched('featureFlags');

  return results.map((user: UserAccount) => {
    user.featureFlags = user.featureFlags!.map((featureFlag) => {
      if (featureFlag.override !== null) {
        featureFlag.value = featureFlag.override;
      }
      return featureFlag;
    });

    return {
      user,
      featureFlags: user.featureFlags
    };
  });
};
