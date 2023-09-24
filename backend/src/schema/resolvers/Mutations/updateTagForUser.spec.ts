import { FlagModel, UserModel } from '../../../data/types';
import { FlagTypeEnum } from '../../../generated/types';
import {
  createTestFlag,
  createTestUser,
  deleteFlags as deleteTestFlags,
  deleteUsers as deleteTestUsers,
  getGraphQLClient,
} from '../../../helpers/testUtils';

describe('Update Tag For User', () => {
  let testFlag: FlagModel;
  let testUser: UserModel;
  const type: FlagTypeEnum = FlagTypeEnum.Boolean;
  const originalValue = false;
  const value = true;

  const client = getGraphQLClient();

  beforeAll(async () => {
    testFlag = await createTestFlag({
      value: originalValue,
      type,
    });
    testUser = await createTestUser();
  });

  afterAll(async () => {
    await deleteTestFlags([testFlag.id]);
    await deleteTestUsers([testUser.id]);
  });

  it('should update the tag value for a single user', async () => {
    await client.targetUsers({
      input: {
        flagId: testFlag.id,
        usersIds: [testUser.id],
        value: originalValue,
      },
    });
    const { updateFlagForUser } = await client.updateFlagForUser({
      input: {
        flagId: testFlag.id,
        userId: testUser.id,
        value,
      },
    });

    expect(updateFlagForUser.success).toBeTruthy();

    const { user } = await client.getUserWithFlag({ userId: testUser.id });
    const userFlag = user.flags.find((flag) => Number(flag.id) === testFlag.id);
    expect(userFlag?.value).toEqual(value);

    const { flag } = await client.getFlag({ flagId: testFlag.id });
    expect(flag.value).toEqual(originalValue);
  });
});
