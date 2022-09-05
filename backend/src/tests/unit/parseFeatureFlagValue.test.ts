import { parseFeatureFlagValue } from '../../datasources/adapters';

describe('parseFeatureFlagValue', () => {
  it('Should return the parsed value of an string provided entry', () => {
    const objectEntry = '{"hello": "world"}';
    expect(parseFeatureFlagValue(objectEntry)).toStrictEqual({
      hello: 'world',
    });

    const arrayEntry = '[1,2,3]';
    expect(parseFeatureFlagValue(arrayEntry)).toStrictEqual([1, 2, 3]);

    const numberEntry = '5';
    expect(parseFeatureFlagValue(numberEntry)).toBe(5);

    const booleanEntry = 'false';
    expect(parseFeatureFlagValue(booleanEntry)).toBe(false);

    const stringEntry = '"Hello World!"';
    expect(parseFeatureFlagValue(stringEntry)).toBe('Hello World!');
  });
});
