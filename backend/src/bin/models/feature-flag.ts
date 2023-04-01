import { Model, snakeCaseMappers } from 'objection';

export enum Type {
  TOGGLE = 'TOGGLE',
  MULTI_VARIATE = 'MULTI_VARIATE'
}

export class FeatureFlag extends Model {
  id: string;
  key: string
  value: string;
  type: string;
  created_at: string;
  updated_at: string;

  static tableName = 'feature_flags';

  static get columnNameMappers() {
    return snakeCaseMappers();
  }
}
