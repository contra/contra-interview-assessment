import { CommonQueryMethodsType } from 'slonik';
import { IUserDatasource, UserDatasource } from './userDatasource';
import {
  IUserFeatureFlagDatasource,
  UserFeatureFlagDatasource,
} from './userFeatureFlagDatasource';

export interface IDatasources {
  userDatasource: IUserDatasource;
  userFeatureFlagDatasource: IUserFeatureFlagDatasource;
}

export class Datasources {
  public userDatasource: IUserDatasource;

  public userFeatureFlagDatasource: IUserFeatureFlagDatasource;

  constructor(private dbConn: CommonQueryMethodsType) {
    this.userDatasource = new UserDatasource(this.dbConn);
    this.userFeatureFlagDatasource = new UserFeatureFlagDatasource(this.dbConn);
  }
}
