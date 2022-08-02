import path from 'path';
import { ApolloServer } from 'apollo-server-fastify';
import fastify from 'fastify';
import { importSchema } from 'graphql-import';
// import { makeExecutableSchema } from 'graphql-tools';
import type { CommonQueryMethodsType } from 'slonik';
// @ts-ignore
import { resolvers } from '../schema/resolvers';

export const createFastifyServer = async (pool: CommonQueryMethodsType) => {
  const app = fastify();

  const graphQLServer = new ApolloServer({
    context: ({ request, reply }) => ({
      pool,
      reply,
      request,
    }),
    resolvers,
    typeDefs: importSchema(path.resolve(__dirname, '../schema/schema.graphql')),
  });

  await graphQLServer.start();

  void app.register(graphQLServer.createHandler());

  return app;
};
