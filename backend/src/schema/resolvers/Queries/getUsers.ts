import { QueryResolvers, User, UserFlag } from '../../../generated/types';

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

  // format output to be of be an array of User objects
  const formatedUsers: User[] = JSON.parse(JSON.stringify(users));
  const result = formatedUsers.map((user: User) => {
    const {
      id,
      email_address,
      family_name,
      feature_flags: userFeatureFlags,
      given_name,
    } = user;
    const formattedUserFlags: UserFlag[] = userFeatureFlags.map(
      (userFlag: UserFlag) => {
        return {
          ...userFlag,
          featureFlag: {
            ...userFlag.featureFlag,
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
