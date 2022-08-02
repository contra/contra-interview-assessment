require('dotenv').config();
import request from 'supertest';

import { runServer } from '../src/bin/runServer';

describe('Hello', () => {
  let testServer: any;

  beforeAll(async () => {
    testServer = await runServer();
  });

  it('world', async () => {
    const queryData = {
      query: `query Query {
        hello
      }`,
    };
    const response = await request(testServer.server)
      .post('/graphql')
      .send(queryData);
    expect(response.body.data?.hello).toBe('world');
  });
});
