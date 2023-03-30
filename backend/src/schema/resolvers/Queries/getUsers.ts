/* eslint-disable no-warning-comments */
import { QueryResolvers, User, UserFlag } from '../../../generated/types';
import { FlagType } from '.prisma/client';

export const getUsers: QueryResolvers['getUsers'] = async (
  _parent,
  _args,
  { db: prisma },
) => {
  const users = await prisma.user.findMany({
    include: {
      feature_flags: {
        include: {
          featureFlag: true,
        },
      },
    },
  });

  // formate output to be of type User[]
  const formatedUsers: User[] = JSON.parse(JSON.stringify(users));
  const result = formatedUsers.map((user: User) => {
    const {
      id,
      email_address,
      family_name,
      feature_flags: userFeatureFlags,
      given_name,
    } = user;
    // TODO: find out how to parse feature flag value
    const formattedUserFlags: UserFlag[] = userFeatureFlags.map(
      (userFlag: UserFlag) => {
        return {
          ...userFlag,
          featureFlag: {
            description: userFlag.featureFlag.description ?? '',
            id: userFlag.featureFlag.id,
            name: userFlag.featureFlag.name,
            type: userFlag.featureFlag.type as FlagType,
          },
        };
      },
    );

    return {
      email_address,
      family_name,
      feature_flags: formattedUserFlags,
      given_name,
      id,
    };
  });

  return result;
};
