import { FlagModel } from '../../../data/types';
import {
  createTestFlag,
  deleteFlags,
  getGraphQLClient,
} from '../../../helpers/testUtils';

describe('Flag test', () => {
  let testFlag: FlagModel;
  const client = getGraphQLClient();

  beforeAll(async () => {
    const flag = await createTestFlag();
    testFlag = flag;
  });

  afterAll(async () => {
    await deleteFlags([testFlag.id]);
  });

  it('should return the list of flags', async () => {
    const { flag } = await client.getFlag({ flagId: testFlag.id });

    expect(flag).toBeDefined();
    expect(flag.name).toEqual(testFlag.name);
  });
});
