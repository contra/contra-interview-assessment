import { Model, snakeCaseMappers } from 'objection';

export class FeatureFlagUser extends Model {
  userId: string;
  featureFlagId: string;
  override: string = '';
  createdAt: string;
  updatedAt: string;

  static tableName = 'feature_flag_user';

  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}
