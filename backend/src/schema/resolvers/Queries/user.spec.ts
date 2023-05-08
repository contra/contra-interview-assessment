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

  it('should get one specific user', async () => {
    const { user } = await client.getUser({ userId: testUser.id });

    expect(user).toBeDefined();
    expect(user.emailAddress).toEqual(testUser.emailAddress);
  });

  it('should return a not found error for inexistent user', async () => {
    await expect(() => client.getUser({ userId: 0 })).rejects.toThrow(
      'Resource not found',
    );
  });
});
