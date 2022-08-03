import request from 'supertest';
import { server } from '../factories/createFastifyServer';
import {
  cleanDB,
  createUserAccount,
  insertFeatureFlag,
  getFlagValueForUser,
} from './fixtures/utils';

let app;

describe('Test if the Mutation can set flag for users', () => {
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

  it('It should be able to update feature flag for multiple user', async () => {
    const user1 = await createUserAccount('John', 'Doe', 'john@gmail.com');
    const user2 = await createUserAccount('Eric', 'Schmidt', 'eric@gmail.com');
    const featureFlag = await insertFeatureFlag(
      'is_video_enabled',
      true,
      'TRUE',
    );
    const response = await request(`http://localhost:8080`)
      .post('/graphql')
      .send({
        operationName: 'Mutation',
        query: `mutation Mutation($input: SetFlagForUsersInput!) {
            setFlagForUsers(input: $input) {
              success
              userIds
              flagName
              booleanValue
              multivariateValue
            }
          }`,
        variables: {
          input: {
            boolean_value: false,
            flagId: featureFlag.id,
            userIds: [user1.id, user2.id],
          },
        },
      });
    expect(response.status).toBe(200);
    const flagValue1 = await getFlagValueForUser(user1.id, featureFlag.id);
    const flagValue2 = await getFlagValueForUser(user2.id, featureFlag.id);
    expect(flagValue1.booleanValue).toBe(false);
    expect(flagValue2.booleanValue).toBe(false);
  });

  it('It should expect boolean_value for a boolean flag', async () => {
    const user1 = await createUserAccount('John', 'Doe', 'john@gmail.com');
    const user2 = await createUserAccount('Eric', 'Schmidt', 'eric@gmail.com');
    const featureFlag = await insertFeatureFlag(
      'is_video_enabled',
      true,
      'TRUE',
    );
    const response = await request(`http://localhost:8080`)
      .post('/graphql')
      .send({
        operationName: 'Mutation',
        query: `mutation Mutation($input: SetFlagForUsersInput!) {
            setFlagForUsers(input: $input) {
              success
              userIds
              flagName
              booleanValue
              multivariateValue
            }
          }`,
        variables: {
          input: {
            flagId: featureFlag.id,
            multivariate_value: 'green',
            userIds: [user1.id, user2.id],
          },
        },
      });
    expect(JSON.parse(response.text).errors[0].extensions.code).toBe(
      'BAD_USER_INPUT',
    );
    expect(JSON.parse(response.text).errors[0].message).toBe(
      'is_video_enabled is of type boolean',
    );
  });

  it('It should expect multivariate_value for a multi variate flag', async () => {
    const user1 = await createUserAccount('John', 'Doe', 'john@gmail.com');
    const user2 = await createUserAccount('Eric', 'Schmidt', 'eric@gmail.com');
    const featureFlag = await insertFeatureFlag(
      'background_color',
      false,
      'green',
    );
    const response = await request(`http://localhost:8080`)
      .post('/graphql')
      .send({
        operationName: 'Mutation',
        query: `mutation Mutation($input: SetFlagForUsersInput!) {
            setFlagForUsers(input: $input) {
              success
              userIds
              flagName
              booleanValue
              multivariateValue
            }
          }`,
        variables: {
          input: {
            boolean_value: false,
            flagId: featureFlag.id,
            userIds: [user1.id, user2.id],
          },
        },
      });
    expect(JSON.parse(response.text).errors[0].extensions.code).toBe(
      'BAD_USER_INPUT',
    );
    expect(JSON.parse(response.text).errors[0].message).toBe(
      'background_color is of type multivariate',
    );
  });
});
