import { UserModel } from '../../../data/types';
import {
  createTestUser,
  deleteUsers,
  getGraphQLClient,
} from '../../../helpers/testUtils';

describe('Queries test', () => {
  let testUser: UserModel;
  const client = getGraphQLClient();

  beforeAll(async () => {
    const user = await createTestUser();
    testUser = user;
  });

  afterAll(async () => {
    await deleteUsers([testUser.id]);
  });

  it('should get the full list of users', async () => {
    const { users } = await client.getUsersWithFlag();
    const result = users.find((user) => Number(user.id) === testUser.id);

    expect(result).toBeDefined();
    expect(result?.familyName).toEqual(testUser.familyName);
  });
});
