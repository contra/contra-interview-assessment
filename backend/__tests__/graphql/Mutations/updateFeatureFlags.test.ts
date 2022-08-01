import { loadSchema } from '@graphql-tools/load';
import { graphql } from 'graphql';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';

describe('Mutation `updateFeatureFlags`', () => {
  it('return the updated feature flag', async () => {
    const schema = await loadSchema('**/schema.graphql', {
      loaders: [new GraphQLFileLoader()],
    });

    const query = /* GraphQL */ `
      mutation {
        updateFeatureFlags(
          userAccountIds: ["1", "2"]
          input: { value: "crab rangoon" }
        ) {
          id
          value
        }
      }
    `;

    const result = await graphql({
      schema: schema,
      source: query,
    });

    expect(result.data).toMatchObject({ updateFeatureFlags: null });
  });
});
