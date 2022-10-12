import { mapUsersFeatureFlags } from '../../datasources/adapters';

describe('mapUsersFeatureFlags', () => {
  it('Should return a map of users feature flags grouped by userId', () => {
    const objectEntry = [
      {
        userId: 123,
        featureFlagKey: 'ALLOW_CREDIT_CARD',
        featureFlagValue: 'true',
      },
      {
        userId: 234,
        featureFlagKey: 'ALLOW_CREDIT_CARD',
        featureFlagValue: 'false',
      },
      {
        userId: 123,
        featureFlagKey: 'DISABLE_SPONSORSHIP',
        featureFlagValue: 'true',
      },
    ];

    const expectedResult = new Map([
      [
        123,
        [
          {
            userId: 123,
            featureFlagKey: 'ALLOW_CREDIT_CARD',
            featureFlagValue: true,
          },
          {
            userId: 123,
            featureFlagKey: 'DISABLE_SPONSORSHIP',
            featureFlagValue: true,
          },
        ],
      ],
      [
        234,
        [
          {
            userId: 234,
            featureFlagKey: 'ALLOW_CREDIT_CARD',
            featureFlagValue: false,
          },
        ],
      ],
    ]);

    expect(mapUsersFeatureFlags(objectEntry)).toStrictEqual(expectedResult);
  });
});
