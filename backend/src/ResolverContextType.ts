import { Logger } from 'roarr';
import { DatabasePoolType } from 'slonik';
import { FlagTypeEnum } from './generated/types';

export type ResolverContext = {
  readonly pool: DatabasePoolType;
  readonly log: Logger;
};

export type MultiValueType =
  | number
  | boolean
  | string
  | {
      [k: string]: MultiValueType;
    }
  | MultiValueType[];

export type UpdateFlagForUserInput = {
  flagId: number;
  userId: number;
  value: MultiValueType;
};

export type TargetUsersInput = {
  flagId: number;
  userIds: number[];
  value: MultiValueType;
};

export type queryFlagInput = {
  flagId: number;
};

export type queryUserInput = {
  userId: number;
};

export type Flag = {
  id: number;
  name: string;
  description: string;
  type: FlagTypeEnum;
  value: MultiValueType;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: number;
  givenName: string;
  familyName: string;
  emailAddress: string;
  createdAt: string;
  updatedAt: string;
  flags: Flag[];
};
