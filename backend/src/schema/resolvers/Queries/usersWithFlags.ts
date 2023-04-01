import { UserAccount } from '../../../bin/models/user-account';
import { QueryResolvers } from '../../../generated/types';

export const resolve: QueryResolvers['usersWithFlags'] = async (
  _parent,
  _args,
) => {
  // another way is to issue 3 queries. depending on the load, it can actually
  // be more beneficial to do 3 queries than a join

  //
  // const r = await pool.from('feature_flag_user')
  //   .innerJoin('user_account AS user', 'user.id', 'feature_flag_user.user_id')
  //   .innerJoin('feature_flags AS feature_flag', 'feature_flag.id', 'feature_flag_user.feature_flag_id')
  //   .select(
  //     'user.id as user__Id',

  //     'feature_flag.id as featureFlag__Id',
  //     'feature_flag.key as featureFlag__Key',
  //     'feature_flag.value as featureFlag__Value',
  //     'feature_flag.type as featureFlag__Type',
  //     'feature_flag.created_at as featureFlag__CreatedAt',
  //     'feature_flag.updated_at as featureFlag__UpdatedAt',

  //     'feature_flag_user.feature_flag_id as featureFlagUser__Id',
  //     'feature_flag_user.override as featureFlagUser__Override',
  //     'feature_flag_user.created_at as featureFlagUser__CreatedAt',
  //     'feature_flag_user.updated_at as featureFlagUser__UpdatedAt',
  //   );

  const results = await UserAccount.query().withGraphFetched('featureFlags');

  return results.map((user: UserAccount) => {
    user.featureFlags = user.featureFlags!.map((featureFlag) => {
      if (featureFlag.override !== null) {
        featureFlag.value = featureFlag.override;
      }
      return featureFlag;
    });

    return {
      userId: user.id,
      featureFlags: user.featureFlags
    };
  });
};
