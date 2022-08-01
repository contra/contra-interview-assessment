import { loadSchema } from '@graphql-tools/load';
import { graphql } from 'graphql';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';

describe('Mutation `updateUserAccounts`', () => {
  it('returns the updated user accounts', async () => {
    const schema = await loadSchema('**/schema.graphql', {
      loaders: [new GraphQLFileLoader()],
    });

    const query = /* GraphQL */ `
      mutation {
        updateUserAccounts(
          featureFlagId: 1
          input: { emailAddress: "crab@rangoon.com" }
        ) {
          id
          emailAddress
        }
      }
    `;

    const result = await graphql({
      schema: schema,
      source: query,
    });

    expect(result.data).toMatchObject({ updateUserAccounts: null });
  });
});
