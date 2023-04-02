import { Model, snakeCaseMappers } from 'objection';
import { FeatureFlagType } from '../../generated/types';

export enum Type {
  TOGGLE = 'TOGGLE',
  MULTI_VARIATE = 'MULTI_VARIATE'
}

export class FeatureFlag extends Model {
  id: number;
  key: string
  value: string;
  type: FeatureFlagType;
  created_at: string;
  updated_at: string;

  static tableName = 'feature_flags';

  static get columnNameMappers() {
    return snakeCaseMappers();
  }
}
