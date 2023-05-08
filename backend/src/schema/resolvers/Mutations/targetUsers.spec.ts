import { FlagModel, UserModel } from '../../../data/types';
import { FlagTypeEnum } from '../../../generated/types';
import {
  createTestFlag,
  createTestUser,
  deleteFlags,
  deleteUsers,
  getGraphQLClient,
} from '../../../helpers/testUtils';

describe('Queries test', () => {
  let testFlag: FlagModel;
  let testUser: UserModel;
  const type: FlagTypeEnum = FlagTypeEnum.Multi;
  const originalValue = { test: 'before' };
  const value = { test: 'after' };

  const client = getGraphQLClient();

  beforeAll(async () => {
    testFlag = await createTestFlag({
      value: originalValue,
      type,
    });
    testUser = await createTestUser();
  });

  afterAll(async () => {
    await deleteFlags([testFlag.id]);
    await deleteUsers([testUser.id]);
  });

  it('should target users keeping original tag value', async () => {
    const { targetUsers } = await client.targetUsers({
      input: {
        flagId: testFlag.id,
        usersIds: [testUser.id],
      },
    });

    expect(targetUsers.success).toBeTruthy();

    const { user } = await client.getUserWithFlag({ userId: testUser.id });
    const userFlag = user.flags.find((flag) => Number(flag.id) === testFlag.id);
    expect(userFlag?.value).toEqual(originalValue);
  });

  it('should update target users successfully', async () => {
    const { targetUsers } = await client.targetUsers({
      input: {
        flagId: testFlag.id,
        usersIds: [testUser.id],
        value,
      },
    });

    expect(targetUsers.success).toBeTruthy();

    const { user } = await client.getUserWithFlag({ userId: testUser.id });
    const userFlag = user.flags.find((flag) => Number(flag.id) === testFlag.id);
    expect(userFlag?.value).toEqual(value);
  });
});
