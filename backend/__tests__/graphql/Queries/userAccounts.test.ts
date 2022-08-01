import { loadSchema } from '@graphql-tools/load';
import { graphql } from 'graphql';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';

describe('Query `userAccounts`', () => {
  it('returns a list of user accounts', async () => {
    const schema = await loadSchema('**/schema.graphql', {
      loaders: [new GraphQLFileLoader()],
    });

    const query = /* GraphQL */ `
      query {
        userAccounts {
          id
          givenName
          featureFlags {
            id
          }
        }
      }
    `;

    const result = await graphql({
      schema: schema,
      source: query,
    });

    expect(result.data).toMatchObject({ userAccounts: null });
  });
});
