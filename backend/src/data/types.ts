import { FlagTypeEnum } from '../generated/types';
import { JsonScalar } from '../ResolverContextType';

export type UserModel = {
  id: number;
  givenName: string;
  familyName: string;
  emailAddress: string;
  createdAt: string;
  updatedAt: string;
};

export type FlagModel = {
  id: number;
  name: string;
  description: string;
  type: FlagTypeEnum;
  value: JsonScalar;
  createdAt: string;
  updatedAt: string;
};
