import userFeatureFlagLoader from "./userFeatureFlagLoader";
import type { CommonQueryMethodsType } from 'slonik';
import DataLoader from "dataloader";

// Unfortunately loses type strictness, but my typescript-fu is falling short
// here.
export interface DataloaderMap {
  [dataloaderName: string]: DataLoader<any, any, any>
}

function dataLoaders(dbConnection: CommonQueryMethodsType): DataloaderMap {
  const dataLoaderMap: DataloaderMap = {
    userFeatureFlagLoader: userFeatureFlagLoader(dbConnection)
  }
  return dataLoaderMap;
}

export default dataLoaders;