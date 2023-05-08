import { FlagModel } from '../../../data/types';
import {
  createTestFlag,
  deleteFlags,
  getGraphQLClient,
} from '../../../helpers/testUtils';

describe('Queries test', () => {
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
    const { flags } = await client.getFlags();
    const result = flags.find((flag) => Number(flag.id) === testFlag.id);

    expect(result).toBeDefined();
    expect(result?.name).toEqual(testFlag.name);
  });
});
