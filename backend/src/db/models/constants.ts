const Schema = Object.freeze({
  COMMON: 'common',
});

const Common = Object.freeze({
  FEATURE_FLAG: 'FeatureFlag',
  USER: 'User',
  USER_FEATURE: 'UserFeatureFlag',
});

const ParanoidOptions = {
  paranoid: true,
  timestamps: false,
};

const Tables = Object.freeze({
  Common,
});

export const modelConstants = {
  ParanoidOptions,
  Schema,
  Tables
}
