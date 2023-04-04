export type UserFeatureFlagInput = {
  userId: string;
  featureFlagId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
};

export type UserFeatureFlagOutput = Omit<UserFeatureFlagInput, 'value'>;
