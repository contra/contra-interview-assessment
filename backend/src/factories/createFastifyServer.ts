import { ApolloServer } from 'apollo-server-fastify';
import fastify from 'fastify';
import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';
import path from 'path';
// @ts-ignore
import type { Knex } from 'knex';
import { resolvers } from '../schema/resolvers';

export const createFastifyServer = async (pool: Knex) => {
  const executableSchema = makeExecutableSchema({
    inheritResolversFromInterfaces: true,
    resolvers,
    resolverValidationOptions: { requireResolversForResolveType: 'ignore' },
    typeDefs: importSchema(path.resolve(__dirname, '../schema/schema.graphql')),
  });

  const app = fastify();

  const graphQLServer = new ApolloServer({
    context: ({ request, reply }) => ({
      pool,
      reply,
      request,
    }),
    schema: executableSchema,
  });

  await graphQLServer.start();

  void app.register(graphQLServer.createHandler());

  return app;
};
