import { Model, snakeCaseMappers } from 'objection';

export class FeatureFlagUser extends Model {
  static get tableName() {
    return 'feature_flag_user';
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  override: string = '';
}
