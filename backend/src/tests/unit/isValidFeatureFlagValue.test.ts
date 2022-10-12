import { isValidFeatureFlag } from '../../datasources/adapters';

describe('isValidFeatureFlag', () => {
  it('Should return false when feature flag value is not valid', () => {
    expect(isValidFeatureFlag(undefined)).toBeFalsy();
    expect(isValidFeatureFlag(null)).toBeFalsy();
  });
});
