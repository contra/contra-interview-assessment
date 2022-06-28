import { DatabasePoolType } from 'slonik';

export type ResolverContext = {
  readonly pool: DatabasePoolType;
};
