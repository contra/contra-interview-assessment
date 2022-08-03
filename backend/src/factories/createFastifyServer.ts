import path from 'path';
import { ApolloServer } from 'apollo-server-fastify';
import fastify from 'fastify';
import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';
import Logger from 'roarr';
import type { CommonQueryMethods } from 'slonik';
import { createPool } from 'slonik';
// @ts-ignore
import { createInterceptors } from 'slonik-interceptor-preset';
import { resolvers } from '../schema/resolvers';

const log = Logger.child({ context: 'bin/server' });

if (!process.env.POSTGRES_CONNECTION_STRING)
  throw new Error(
    'Must provide a PG connection string (export POSTGRES_CONNECTION_STRING=value) -- if you need a fresh database, we recommend using Render.com',
  );

const pool = createPool(process.env.POSTGRES_CONNECTION_STRING, {
  captureStackTrace: false,
  connectionTimeout: 60 * 1_000,
  interceptors: createInterceptors(),
});

export const createFastifyServer = async (
  connectionPool: CommonQueryMethods,
) => {
  const executableSchema = makeExecutableSchema({
    inheritResolversFromInterfaces: true,
    resolvers,
    resolverValidationOptions: { requireResolversForResolveType: 'ignore' },
    typeDefs: importSchema(path.resolve(__dirname, '../schema/schema.graphql')),
  });

  const app = fastify();

  const graphQLServer = new ApolloServer({
    context: ({ request, reply }) => ({
      pool: connectionPool,
      reply,
      request,
    }),
    schema: executableSchema,
  });

  await graphQLServer.start();

  void app.register(graphQLServer.createHandler());

  return app;
};

export const server = async () => {
  try {
    const app = await createFastifyServer(pool);

    await app.listen(8_080, '0.0.0.0');
    log.info('Server listening on port 8080 new');

    return app;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);

    return error;
  }
};
