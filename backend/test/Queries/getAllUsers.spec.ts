require('dotenv').config();
import request from 'supertest';

import { runServer } from '../../src/bin/runServer';

describe('getAllUsers', () => {
  let testServer: any;

  beforeAll(async () => {
    testServer = await runServer();
  });

  it('expect an array as a response', async () => {
    const queryData = {
      query: `query Query {
        getAllUsers {
          id
        }
      }`,
    };
    const response = await request(testServer.server)
      .post('/graphql')
      .send(queryData);

    const usersList = response.body.data.getAllUsers;
    expect(Array.isArray(usersList)).toBe(true);
  });
});
