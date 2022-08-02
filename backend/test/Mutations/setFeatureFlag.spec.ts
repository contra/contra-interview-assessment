require('dotenv').config();
import request from 'supertest';

import { runServer } from '../../src/bin/runServer';
import { FeatureFlagPersistence } from '../../src/schema/resolvers/FeatureFlagPersistence';

describe('setFeatureFlag', () => {
  let testServer: any;

  beforeAll(async () => {
    testServer = await runServer();
  });

  it('should fail is user_id does not exist', async () => {
    const queryData = {
      query: `mutation Mutation($userIds: [Int!]!, $flagData: FeatureFlagData!) {
        setFeatureFlag(userIds: $userIds, flagData: $flagData) {
          success
        }
      }`,
      variables: {
        userIds: [999],
        flagData: { key: 'flagForAll', value: 'somevalue' },
      },
    };
    const response = await request(testServer.server)
      .post('/graphql')
      .send(queryData);

    const { success } = response.body.data.setFeatureFlag;
    expect(success).toBe(false);
  });

  it('expect set a flag for 3 different users and return success', async () => {
    const queryData = {
      query: `mutation Mutation($userIds: [Int!]!, $flagData: FeatureFlagData!) {
        setFeatureFlag(userIds: $userIds, flagData: $flagData) {
          success
        }
      }`,
      variables: {
        userIds: [1, 2, 3],
        flagData: { key: 'flagForAll', value: 'somevalue' },
      },
    };
    const response = await request(testServer.server)
      .post('/graphql')
      .send(queryData);

    const { success } = response.body.data.setFeatureFlag;
    expect(success).toBe(true);
  });

  it('expect to set a flag for a user if it already exists', async () => {
    const updateFeatureFlagSpy = jest.spyOn(
      FeatureFlagPersistence,
      'updateFeatureFlag',
    );

    const queryData = {
      query: `mutation Mutation($userIds: [Int!]!, $flagData: FeatureFlagData!) {
        setFeatureFlag(userIds: $userIds, flagData: $flagData) {
          success
        }
      }`,
      variables: {
        userIds: [1],
        flagData: { key: 'background', value: 'red' },
      },
    };
    const response = await request(testServer.server)
      .post('/graphql')
      .send(queryData);

    expect(updateFeatureFlagSpy).toHaveBeenCalledTimes(1);

    const { success } = response.body.data.setFeatureFlag;
    expect(success).toBe(true);
  });

  it('expect create a flag for a user if is not defined yet', async () => {
    const createFeatureFlagSpy = jest.spyOn(
      FeatureFlagPersistence,
      'createFeatureFlag',
    );

    const newFlagKey = `newFlagKey-${Date.now()}`;

    const queryData = {
      query: `mutation Mutation($userIds: [Int!]!, $flagData: FeatureFlagData!) {
        setFeatureFlag(userIds: $userIds, flagData: $flagData) {
          success
        }
      }`,
      variables: {
        userIds: [1],
        flagData: { key: newFlagKey, value: 'red' },
      },
    };
    const response = await request(testServer.server)
      .post('/graphql')
      .send(queryData);

    expect(createFeatureFlagSpy).toHaveBeenCalledTimes(1);

    const { success } = response.body.data.setFeatureFlag;
    expect(success).toBe(true);
  });

  it('should not set the flag for any user if userIds input is empty', async () => {
    const updateFeatureFlagSpy = jest.spyOn(
      FeatureFlagPersistence,
      'updateFeatureFlag',
    );

    const createFeatureFlagSpy = jest.spyOn(
      FeatureFlagPersistence,
      'createFeatureFlag',
    );

    const queryData = {
      query: `mutation Mutation($userIds: [Int!]!, $flagData: FeatureFlagData!) {
        setFeatureFlag(userIds: $userIds, flagData: $flagData) {
          success
        }
      }`,
      variables: {
        userIds: [],
        flagData: { key: 'one-more-key', value: 'red' },
      },
    };
    const response = await request(testServer.server)
      .post('/graphql')
      .send(queryData);

    expect(updateFeatureFlagSpy).toHaveBeenCalledTimes(0);
    expect(createFeatureFlagSpy).toHaveBeenCalledTimes(0);

    const { success } = response.body.data.setFeatureFlag;
    expect(success).toBe(true);
  });
});
