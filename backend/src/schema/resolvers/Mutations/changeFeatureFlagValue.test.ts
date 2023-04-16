import { FastifyInstance, FastifyLoggerInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { ofetch } from 'ofetch';
import { createServerInstance } from '../../../bin/server';

const serverURL = 'http://localhost:8080/graphql';

describe('Targe Feature Flag', () => {
  let server: FastifyInstance<
    Server<typeof IncomingMessage, typeof ServerResponse>,
    IncomingMessage,
    ServerResponse<IncomingMessage>,
    FastifyLoggerInstance
  > | null;

  beforeAll(async () => {
    server = await createServerInstance();
    if (!server) return;
    await server.ready();
  });
  afterAll(async () => {
    await server?.close();
  });
  it('should retun dummy item when flag was successfull changed', async () => {
    expect.assertions(1);

    const resp = await ofetch(serverURL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        query: `mutation test {changeFeatureFlagValue(input: { name: "feature1", value: 1, userId: "luke@star.com" }) {familyName}}`,
      }),
    });
    expect(resp).toEqual({
      data: {
        changeFeatureFlagValue: {
          familyName: 'Skywalker',
        },
      },
    });
  });
  it('should retun error when non existing flag is used', async () => {
    expect.assertions(1);

    const resp = await ofetch(serverURL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        query: `mutation test {targetWithFeatureFlag(input: { name: "featureNotExist", value: 2, userIds: ["luke@star.com"] }) {familyName}}`,
      }),
    });
    expect(resp).toEqual(
      expect.objectContaining({
        errors: expect.arrayContaining([]),
      }),
    );
  });
  it('should retun error when user does not exist', async () => {
    expect.assertions(1);

    const resp = await ofetch(serverURL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        query: `mutation test {targetWithFeatureFlag(input: { name: "feature1", value: 2, userIds: ["luke2@star.com"] }) {familyName}}`,
      }),
    });
    expect(resp).toEqual(
      expect.objectContaining({
        errors: expect.arrayContaining([]),
      }),
    );
  });
});
