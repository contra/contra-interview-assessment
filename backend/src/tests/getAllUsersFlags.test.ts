import request from 'supertest';
import { server } from '../factories/createFastifyServer';
import {
  cleanDB,
  createUserAccount,
  insertFeatureFlag,
} from './fixtures/utils';

let app;

describe('Get all Users flag test', () => {
  // Start the server before the tests
  beforeAll(async () => {
    app = await server();
  });

  beforeEach(async () => {
    await cleanDB();
  });

  // after the tests we will stop our server
  afterAll(async () => {
    await app.close();
  });

  it('Its is able to retrieve all users feature flags', async () => {
    const user = await createUserAccount('John', 'Doe', 'john@gmail.com');
    const featureFlag = await insertFeatureFlag(
      'is_video_enabled',
      true,
      'TRUE',
    );
    const response = await request(`http://localhost:8080`)
      .post('/graphql')
      .send({
        operationName: 'GetAllUsersFlags',
        query: `query GetAllUsersFlags {
            getAllUsersFlags {
              featureFlags {
                name
                booleanValue
                multivariateValue
                id
              }
              userId
              name
            }
          }`,
        variables: {},
      });
    expect(response.status).toBe(200);
    expect(JSON.parse(response.text).data).toEqual({
      getAllUsersFlags: [
        {
          featureFlags: [
            {
              booleanValue: true,
              id: featureFlag.id,
              multivariateValue: null,
              name: featureFlag.name,
            },
          ],
          name: user.givenName,
          userId: user.id,
        },
      ],
    });
  });
});
