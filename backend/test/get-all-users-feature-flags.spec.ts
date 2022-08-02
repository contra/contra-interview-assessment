require('dotenv').config();

import { runServer } from '../src/bin/runServer';
import request from 'supertest';

describe('Get all users feature flags', () => {
  let testServer: any;

  beforeAll(async () => {
    testServer = await runServer();
  });

  it('hello world', async () => {
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
