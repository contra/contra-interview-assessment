import { MutationResolvers } from '../../../generated/types';
import { checkFlagInRange } from '../../../helper/checkFlaginRange';

export const resolve: MutationResolvers['changeFeatureFlagValue'] = async (
  _,
  { input },
  { prisma },
) => {
  const { name: flagName, value: flagValue, userId } = input;
  // check up weather feature exists in selection
  const featureFlag = await prisma.featureFlagSelection.findUnique({
    where: { name: flagName },
  });
  if (!featureFlag)
    throw new Error(`Feature flag ${flagName} not found in selection`);
  // check up weather user exists
  const user = await prisma.user.findUnique({
    where: { email: userId },
    include: { featureFlags: true },
  });
  if (!user) throw new Error(`User with email ${userId} not found`);
  // check up weather feature flag exists in user
  const featureExistForUser = user.featureFlags.findIndex(
    (featureFlag) => featureFlag.name === flagName,
  );
  if (featureExistForUser < 0)
    throw new Error(`Feature flag ${flagName} not found in user`);
  // check up weather feature value is in range
  const flagValueinRange = checkFlagInRange(flagValue, featureFlag);
  if (flagValueinRange < 0)
    throw new Error(
      `Feature flag ${flagName} not in range ${featureFlag.possibleValues.toString()} `,
    );
  // update featureflag value
  const updatedUser = await prisma.user.update({
    where: { email: userId },
    data: {
      featureFlags: {
        update: {
          where: { email_name: { email: userId, name: flagName } },
          data: {
            value: flagValue,
          },
        },
      },
    },
  });

  return updatedUser;
};
