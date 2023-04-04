/* eslint-disable fp/no-this */
/* eslint-disable fp/no-class */

import { PrismaClient } from '@prisma/client';
import { User, UserFlag } from '../generated/types';

export class UserService {
  readonly db: PrismaClient;

  constructor(database: PrismaClient) {
    this.db = database;
  }

  /**
   * fetch all users and their associated feature flags
   *
   * @returns Promise
   */
  async findAllUsers(): Promise<User[]> {
    const users = await this.db.user.findMany({
      include: {
        feature_flags: {
          include: {
            featureFlag: true,
          },
        },
      },
    });
    // return formatted output to be of be an array of User objects

    return this.formatUsers(JSON.parse(JSON.stringify(users)));
  }

  /**
   *
   * @param users
   * @returns
   */
  async formatUsers(users: User[]): Promise<User[]> {
    const result = users.map((user: User) => {
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
  }
}
