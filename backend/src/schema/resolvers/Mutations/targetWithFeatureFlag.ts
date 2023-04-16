import { MutationResolvers } from '../../../generated/types';
import { checkFlagInRange } from '../../../helper/checkFlaginRange';

export const resolve: MutationResolvers['targetWithFeatureFlag'] = async (
  _,
  { input },
  { prisma },
) => {
  const { name: flagName, value: flagValue, userIds } = input;
  // check up weather feature exists
  const featureFlag = await prisma.featureFlagSelection.findUnique({
    where: { name: flagName },
  });
  if (!featureFlag) throw new Error(`Feature flag ${flagName} not found`);
  // check up weather feature value is in range
  const flagValueinRange = checkFlagInRange(flagValue, featureFlag);
  if (flagValueinRange < 0)
    throw new Error(
      `Feature flag ${flagName} not in range ${featureFlag.possibleValues.toString()} `,
    );
  // create featureflag only when it was not created before
  // (Here also possible to tell the client user who already have the flag)
  const updatesPrisma = userIds.map((email) =>
    prisma.user.update({
      where: { email: email },
      data: {
        featureFlags: {
          upsert: {
            where: { email_name: { email: email, name: flagName } },
            create: {
              email: email,
              name: flagName,
              value: flagValue,
            },
            update: {},
          },
        },
      },
    }),
  );
  const updatedUser = await prisma.$transaction(updatesPrisma);
  return updatedUser;
};
