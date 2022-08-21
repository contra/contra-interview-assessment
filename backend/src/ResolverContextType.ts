import { DatabasePoolType } from 'slonik';
import { DataloaderMap } from './dataloaders';

export type ResolverContext = {
  readonly loaders: DataloaderMap;
  readonly pool: DatabasePoolType;
};
