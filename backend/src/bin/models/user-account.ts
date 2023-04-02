import { Model, snakeCaseMappers } from 'objection';
import { FeatureFlag } from './feature-flag';
import { FeatureFlagUser } from './feature-flag-user';

type RelatedFeatureFlags = FeatureFlag & Pick<FeatureFlagUser, 'override'>;

export class UserAccount extends Model {
  id: number;
  featureFlags: RelatedFeatureFlags[] = [];

  static tableName = 'user_account';

  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static relationMappings = {
    featureFlags: {
      modelClass: FeatureFlag,
      relation: Model.ManyToManyRelation,
      join: {
        from: 'user_account.id',
        to: 'feature_flags.id',
        through: {
          from: 'feature_flag_user.user_id',
          to: 'feature_flag_user.feature_flag_id',
          extra: ['override']
        }
      },
    },
  }
}