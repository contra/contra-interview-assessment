import { userFeatureFlagsMapToUserFeatureFlagResponse } from '../../datasources/adapters';
import { UserFeatureFlag } from '../../generated/types';

describe('userFeatureFlagsMapToUserFeatureFlagResponse', () => {
  it('Should return a matrix of users feature flags from users feature flags map', () => {
    const userIds = [123, 234];
    const expectedResult = [
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
      [
        {
          userId: 234,
          featureFlagKey: 'ALLOW_CREDIT_CARD',
          featureFlagValue: false,
        },
      ],
    ];

    const objectEntry = new Map<number, UserFeatureFlag[]>([
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

    expect(
      userFeatureFlagsMapToUserFeatureFlagResponse(userIds, objectEntry),
    ).toStrictEqual(expectedResult);
  });
});
