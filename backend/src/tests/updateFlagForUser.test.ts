import request from 'supertest';
import { server } from '../factories/createFastifyServer';
import {
  cleanDB,
  createUserAccount,
  insertFeatureFlag,
  getFlagValueForUser,
} from './fixtures/utils';

let app;

describe('Test if the Mutation update flag for a given user', () => {
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

  it('It should it able to update the value of a flag for a single user', async () => {
    const user1 = await createUserAccount('John', 'Doe', 'john@gmail.com');
    const featureFlag = await insertFeatureFlag(
      'is_video_enabled',
      true,
      'TRUE',
    );
    const response = await request(`http://localhost:8080`)
      .post('/graphql')
      .send({
        operationName: 'UpdateFlagForUser',
        query: `mutation UpdateFlagForUser($input: UpdateFlagForUserInput!) {
          updateFlagForUser(input: $input) {
            id
            name
            booleanValue
            multivariateValue
          }
        }`,
        variables: {
          input: {
            boolean_value: false,
            flagId: featureFlag.id,
            userId: user1.id,
          },
        },
      });
    expect(response.status).toBe(200);
    const flagValue1 = await getFlagValueForUser(user1.id, featureFlag.id);
    expect(flagValue1.booleanValue).toBe(false);
  });

  it('It should expect boolean_value for a boolean flag', async () => {
    const user1 = await createUserAccount('John', 'Doe', 'john@gmail.com');
    const featureFlag = await insertFeatureFlag(
      'is_video_enabled',
      true,
      'TRUE',
    );
    const response = await request(`http://localhost:8080`)
      .post('/graphql')
      .send({
        operationName: 'UpdateFlagForUser',
        query: `mutation UpdateFlagForUser($input: UpdateFlagForUserInput!) {
          updateFlagForUser(input: $input) {
            id
            name
            booleanValue
            multivariateValue
          }
        }`,
        variables: {
          input: {
            flagId: featureFlag.id,
            multivariate_value: 'green',
            userId: user1.id,
          },
        },
      });
    expect(JSON.parse(response.text).errors[0].message).toBe(
      'boolean_value is required for is_video_enabled',
    );
  });

  it('It should expect multivariate_value for a multi variate flag', async () => {
    const user1 = await createUserAccount('John', 'Doe', 'john@gmail.com');
    const featureFlag = await insertFeatureFlag(
      'background_color',
      false,
      'green',
    );
    const response = await request(`http://localhost:8080`)
      .post('/graphql')
      .send({
        operationName: 'UpdateFlagForUser',
        query: `mutation UpdateFlagForUser($input: UpdateFlagForUserInput!) {
          updateFlagForUser(input: $input) {
            id
            name
            booleanValue
            multivariateValue
          }
        }`,
        variables: {
          input: {
            boolean_value: false,
            flagId: featureFlag.id,
            userId: user1.id,
          },
        },
      });
    expect(JSON.parse(response.text).errors[0].message).toBe(
      'multivariate_value is required for background_color',
    );
  });
});
