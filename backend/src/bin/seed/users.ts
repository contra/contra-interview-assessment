import { UserModel } from '../../data/types';
import { faker } from '@faker-js/faker';
import { sql } from 'slonik';

export type UserInsertModel = Pick<
  UserModel,
  'familyName' | 'givenName' | 'emailAddress'
>;

export function generateUsers(amount = 1): UserInsertModel[] {
  const createUser = () => {
    const givenName = faker.name.firstName();
    const familyName = faker.name.lastName();
    return {
      givenName,
      familyName,
      emailAddress: faker.internet.email(givenName, familyName),
    };
  };

  return Array.from({ length: amount }).map(createUser);
}

export function getUsersInsertSql(users: UserInsertModel[]) {
  const values = users.map(
    (user) =>
      sql`(${user.givenName}, ${user.familyName}, ${user.emailAddress})`,
  );
  return sql`
      INSERT INTO user_account (given_name, family_name, email_address)
      VALUES ${sql.join(values, sql`,`)}
    `;
}
