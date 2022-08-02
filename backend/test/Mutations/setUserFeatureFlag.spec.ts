require('dotenv').config();
import request from 'supertest';

import { runServer } from '../../src/bin/runServer';
import { FeatureFlagPersistence } from '../../src/schema/resolvers/FeatureFlagPersistence';

describe('setUserFeatureFlag', () => {
  let testServer: any;

  beforeAll(async () => {
    testServer = await runServer();
  });

  it('expect fail if the user_id does not exist', async () => {
    const queryData = {
      query: `mutation Mutation($userId: Int!, $flagData: FeatureFlagData!) {
        setUserFeatureFlag(userId: $userId, flagData: $flagData) {
          success
        }
      }`,
      variables: {
        userId: 999,
        flagData: { key: 'expect-user-not-exists-key', value: 'some-value' },
      },
    };
    const response = await request(testServer.server)
      .post('/graphql')
      .send(queryData);

    const { success } = response.body.data.setUserFeatureFlag;
    expect(success).toBe(false);
  });

  it('expect to create a new feature flag if it does not exist yet', async () => {
    const createFeatureFlagSpy = jest.spyOn(
      FeatureFlagPersistence,
      'createFeatureFlag',
    );

    const newFlagKey = `newFlagKey-${Date.now()}`;

    const queryData = {
      query: `mutation Mutation($userId: Int!, $flagData: FeatureFlagData!) {
        setUserFeatureFlag(userId: $userId, flagData: $flagData) {
          success
        }
      }`,
      variables: {
        userId: 1,
        flagData: { key: newFlagKey, value: 'some-value' },
      },
    };
    const response = await request(testServer.server)
      .post('/graphql')
      .send(queryData);

    expect(createFeatureFlagSpy).toHaveBeenCalledTimes(1);

    const { success } = response.body.data.setUserFeatureFlag;
    expect(success).toBe(true);
  });

  it('expect to update existing feature flag if it already exists', async () => {
    const updateFeatureFlagSpy = jest.spyOn(
      FeatureFlagPersistence,
      'updateFeatureFlag',
    );

    const queryData = {
      query: `mutation Mutation($userId: Int!, $flagData: FeatureFlagData!) {
        setUserFeatureFlag(userId: $userId, flagData: $flagData) {
          success
        }
      }`,
      variables: {
        userId: 1,
        flagData: { key: 'background', value: 'black' },
      },
    };
    const response = await request(testServer.server)
      .post('/graphql')
      .send(queryData);

    expect(updateFeatureFlagSpy).toHaveBeenCalledTimes(1);

    const { success } = response.body.data.setUserFeatureFlag;
    expect(success).toBe(true);
  });
});
