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

  it('expect featureFlags to be defined as an array for each user', async () => {
    const queryData = {
      query: `query Query {
        getAllUsers {
          id
          featureFlags {
            id
            userId
          }
        }
      }`,
    };
    const response = await request(testServer.server)
      .post('/graphql')
      .send(queryData);

    const usersList = response.body.data.getAllUsers;

    for (let user of usersList) {
      expect(user.featureFlags).toBeDefined();
      expect(Array.isArray(user.featureFlags)).toBe(true);
    }
  });

  it('expect only 1 user record if limit is set to 1', async () => {
    const limit = 1;
    const queryData = {
      query: `query Query($limit: Int, $skip: Int) {
        getAllUsers(limit: $limit, skip: $skip) {
          id
          featureFlags {
            id
            userId
          }
        }
      }`,
      variables: { limit },
    };
    const response = await request(testServer.server)
      .post('/graphql')
      .send(queryData);

    const usersList = response.body.data.getAllUsers;
    expect(usersList.length).toBe(limit);
  });

  it('expect user with id 1 to be missing because we skipped the first record using skip=1', async () => {
    const skip = 1;
    const queryData = {
      query: `query Query($limit: Int, $skip: Int) {
        getAllUsers(limit: $limit, skip: $skip) {
          id
          featureFlags {
            id
            userId
          }
        }
      }`,
      variables: { skip },
    };
    const response = await request(testServer.server)
      .post('/graphql')
      .send(queryData);

    const usersList = response.body.data.getAllUsers;
    expect(usersList[0].id !== 1).toBe(true);
  });
});
