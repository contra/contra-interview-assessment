import _ from 'lodash';
import { buildBulkValues } from '../../src/schema/resolvers/FeatureFlagPersistence';
import { FeatureFlagData } from '../../src/generated/types';

describe('buildBulkValues', () => {
  it('should return a string with 3 pairs of placeholder values surrounded by parentheses and separated by commas', () => {
    const userIds: number[] = [1, 2, 3];
    const flagData: FeatureFlagData = { key: 'some-key', value: 'some-value' };
    const result = buildBulkValues(userIds, flagData);
    expect(result.sql).toEqual('($1,$2,$3),($4,$5,$6),($7,$8,$9)');
  });

  it('should 3 pairs of userId,flagData.Value to be injected in the sql query', () => {
    const userIds: number[] = [1, 2, 3];
    const flagData: FeatureFlagData = { key: 'some-key', value: 'some-value' };
    const result = buildBulkValues(userIds, flagData);
    expect(
      _.isEqual(result.values, [
        userIds[0],
        flagData.key,
        flagData.value,
        userIds[1],
        flagData.key,
        flagData.value,
        userIds[2],
        flagData.key,
        flagData.value,
      ]),
    ).toBe(true);
  });
});
