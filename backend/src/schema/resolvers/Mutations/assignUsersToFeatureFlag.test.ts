import { createFastifyServer } from "../../../factories/createFastifyServer";

jest.mock('slonik', () => {
  const actualSlonik = jest.requireActual('slonik');
  const mockSql: any = jest.fn((strings, ...values) => {
    return `${strings[0]}${values.join('')}`;
  });
  mockSql.json = jest.fn(value => value);
  
return {
    ...actualSlonik,
    sql: mockSql,
  };
});

describe('assignUsersToFeatureFlag Resolver', () => {

  let mockPool: any;
  let app: any;

  beforeAll(async () => {
    mockPool = {
      maybeOne: jest.fn(),
      query: jest.fn(),
    };

    app = await createFastifyServer(mockPool);

    jest.clearAllMocks()
  });

  const query = `
    mutation AssignUsersToFeatureFlag(
      $userAccountIds: [ID!]!, 
      $featureFlagId: ID!, 
      $value: String!
    ) {
      assignUsersToFeatureFlag(
        userAccountIds: $userAccountIds, 
        featureFlagId: $featureFlagId, 
        value: $value
      ) {
        userId,
        value
      }
    }
  `;

  it('successfully assigns users to a feature flag', async () => {
    mockPool.maybeOne.mockResolvedValueOnce({ type: 'sample_type' });
    [1,2,3].forEach(() => {
      mockPool.query.mockResolvedValueOnce({ rowCount: 1 });
    });

    const response = await app.inject({ 
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      payload: {
        query,
        variables: {
          featureFlagId: 3,
          userAccountIds: [1,2,3],
          value: "dog"
        }
      },
      url: '/graphql'
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).data.assignUsersToFeatureFlag).toHaveLength(3);
  });

  it('throws error when feature flag is not found', async () => {
    mockPool.maybeOne.mockResolvedValueOnce(null);

    const response = await app.inject({ 
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      payload: {
        query,
        variables: {
          featureFlagId: 3,
          userAccountIds: [1],
          value: "dog"
        }
      },
      url: '/graphql'
    });

    expect(JSON.parse(response.body).errors[0].message).toBe('Failed to assign users to feature flag.');
  });

  it('handles database insertion failures gracefully', async () => {
    mockPool.maybeOne.mockResolvedValueOnce({ type: 'sample_type' });
    mockPool.query.mockRejectedValueOnce(new Error('DB Insertion Error'));

    const response = await app.inject({ 
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      payload: {
        query,
        variables: {
          featureFlagId: 3,
          userAccountIds: [1,2,3],
          value: "dog"
        }
      },
      url: '/graphql'
    });

    expect(JSON.parse(response.body).errors[0].message).toBe('Failed to assign users to feature flag.');
  });
});
