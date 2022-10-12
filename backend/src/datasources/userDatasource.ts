import { CommonQueryMethodsType, sql } from 'slonik';
import { User } from '../generated/types';

export interface IUserDatasource {
  getUsers: () => Promise<User[]>;
}

export class UserDatasource implements IUserDatasource {
  constructor(private dbConn: CommonQueryMethodsType) {}

  public async getUsers(): Promise<User[]> {
    const string = sql<User>`
  SELECT  id as user_id, given_name, family_name, email_address
  FROM user_account;`;

    return this.dbConn.many(string).then((result) => [...result]);
  }
}
