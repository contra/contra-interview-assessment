require('dotenv').config();
import request from 'supertest';

import { runServer } from '../../src/bin/runServer';

describe('getAllFeatureFlags', () => {
  let testServer: any;

  beforeAll(async () => {
    testServer = await runServer();
  });

  it('expect an array of FeatureFlags', async () => {
    const queryData = {
      query: `query Query {
        getAllFeatureFlags {
          id
          userId
        }
      }`,
    };
    const response = await request(testServer.server)
      .post('/graphql')
      .send(queryData);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});
