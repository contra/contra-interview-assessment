require('dotenv').config();
import _ from 'lodash';
import request from 'supertest';

import { runServer } from '../../src/bin/runServer';

describe('setFeatureFlag', () => {
  let testServer: any;

  beforeAll(async () => {
    testServer = await runServer();
  });

  it('should fail if user_id does not exist', async () => {
    const queryData = {
      query: `mutation Mutation($userIds: [Int!]!, $flagData: FeatureFlagData!) {
        setFeatureFlag(userIds: $userIds, flagData: $flagData) {
            failedUserIds
            affectedUserIds
        }
      }`,
      variables: {
        userIds: [999, 888],
        flagData: { key: 'flagForAll', value: 'somevalue' },
      },
    };
    const response = await request(testServer.server)
      .post('/graphql')
      .send(queryData);

    const {
      failedUserIds,
      affectedUserIds,
    } = response.body.data.setFeatureFlag;

    expect(_.isEqual(affectedUserIds, [])).toBe(true);
    expect(_.isEqual(failedUserIds, queryData.variables.userIds)).toBe(true);
  });

  it('should fail for users that do not exist: 999, 555 and succeed for user 1', async () => {
    const queryData = {
      query: `mutation Mutation($userIds: [Int!]!, $flagData: FeatureFlagData!) {
        setFeatureFlag(userIds: $userIds, flagData: $flagData) {
            failedUserIds
            affectedUserIds
        }
      }`,
      variables: {
        userIds: [1, 999, 555],
        flagData: { key: 'flagForPartialUpdate', value: 'somevalue' },
      },
    };
    const response = await request(testServer.server)
      .post('/graphql')
      .send(queryData);

    const {
      failedUserIds,
      affectedUserIds,
    } = response.body.data.setFeatureFlag;

    expect(_.isEqual(affectedUserIds, [1])).toBe(true);
    expect(_.isEqual(failedUserIds, [999, 555])).toBe(true);
  });

  it('expect to set a flag for a user if it already exists', async () => {
    const queryData = {
      query: `mutation Mutation($userIds: [Int!]!, $flagData: FeatureFlagData!) {
        setFeatureFlag(userIds: $userIds, flagData: $flagData) {
            failedUserIds
            affectedUserIds
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

    const {
      failedUserIds,
      affectedUserIds,
    } = response.body.data.setFeatureFlag;

    expect(_.isEqual(affectedUserIds, queryData.variables.userIds)).toBe(true);
    expect(_.isEqual(failedUserIds, [])).toBe(true);
  });

  it('expect create a flag for a user if is not defined yet', async () => {
    const newFlagKey = `newFlagKey-${Date.now()}`;

    const queryData = {
      query: `mutation Mutation($userIds: [Int!]!, $flagData: FeatureFlagData!) {
        setFeatureFlag(userIds: $userIds, flagData: $flagData) {
            failedUserIds
            affectedUserIds
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

    const {
      failedUserIds,
      affectedUserIds,
    } = response.body.data.setFeatureFlag;

    expect(_.isEqual(affectedUserIds, queryData.variables.userIds)).toBe(true);
    expect(_.isEqual(failedUserIds, [])).toBe(true);
  });

  it('should not set the flag for any user if userId input is empty', async () => {
    const queryData = {
      query: `mutation Mutation($userIds: [Int!]!, $flagData: FeatureFlagData!) {
        setFeatureFlag(userIds: $userIds, flagData: $flagData) {
            failedUserIds
            affectedUserIds
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

    const {
      failedUserIds,
      affectedUserIds,
    } = response.body.data.setFeatureFlag;

    expect(_.isEqual(affectedUserIds, [])).toBe(true);
    expect(_.isEqual(failedUserIds, [])).toBe(true);
  });
});
