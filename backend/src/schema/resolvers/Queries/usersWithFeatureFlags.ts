import { UserAccount } from '../../../bin/models/user-account';
import { QueryResolvers } from '../../../generated/types';

/**
 * Return list of all users along with the associated feature flags
 */
export const resolve: QueryResolvers['users'] = async (
  _: any,
  __: any,
  // @ts-ignore
  { repository, correlationId }
) => {
  const results: UserAccount[] = await repository.getAllUsers({ correlationId });

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
