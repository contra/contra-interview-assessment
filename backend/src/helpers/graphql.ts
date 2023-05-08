import { FlagModel, UserModel } from '../data/types';
import { Flag, User } from '../generated/types';

export function parseUserModel(user: UserModel): User {
  return {
    ...user,
    flags: [],
  };
}

export function parseFlagModel(flag: FlagModel): Flag {
  return {
    ...flag,
    value: JSON.parse(flag.value as string),
  };
}
