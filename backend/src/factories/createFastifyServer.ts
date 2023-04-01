import { ApolloServer } from 'apollo-server-fastify';
import fastify from 'fastify';
import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';
import path from 'path';
// @ts-ignore
import type { Knex } from 'knex';
import Logger from 'roarr';
import { v4 } from 'uuid';
import { Repository } from '../bin/repository';
import { resolvers } from '../schema/resolvers';

const logger = Logger.child({ context: 'factories/createFastifyServer' });

export const createFastifyServer = async (pool: Knex) => {
  

  const executableSchema = makeExecutableSchema({
    inheritResolversFromInterfaces: true,
    resolvers,
    resolverValidationOptions: { requireResolversForResolveType: 'ignore' },
    typeDefs: importSchema(path.resolve(__dirname, '../schema/schema.graphql')),
  });

  const app = fastify();
  const repository = new Repository();

  const graphQLServer = new ApolloServer({
    context: ({ request, reply }) => ({
      pool,
      reply,
      request,
      repository,
      correlationId: request.headers['x-correlation-id'] 
        ? request.headers['x-correlation-id']
        : v4()
    }),
    schema: executableSchema,
    formatError: (error) => {
      logger.error(error, 'Error handling request');

      if (error.extensions.exception && error.extensions.exception.name === 'UniqueViolationError') {
        const { detail } = error.extensions.exception.nativeError;
        const [_, featureFlagId, userId] = detail.match(/(\d{1}),\s(\d{1})/);

        throw new Error(`User with ID ${userId} already targetted with feature flag ID ${featureFlagId}. Cannot re-assign.`);
      }

      if (error.extensions.exception && error.extensions.exception.client === 'postgres') {
        throw new Error('Internal server error');
      }

      return error;
    },
  });

  await graphQLServer.start();

  void app.register(graphQLServer.createHandler());

  return app;
};
