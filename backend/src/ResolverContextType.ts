import { Logger } from 'roarr';
import { DatabasePoolType } from 'slonik';

export type ResolverContext = {
  readonly pool: DatabasePoolType;
  readonly log: Logger;
};

export type JsonScalar =
  | number
  | boolean
  | string
  | {
      [k: string]: JsonScalar;
    }
  | JsonScalar[];
