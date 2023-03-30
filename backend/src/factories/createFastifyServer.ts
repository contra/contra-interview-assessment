import path from 'path';
import { ApolloServer } from 'apollo-server-fastify';
import fastify from 'fastify';
import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';
// @ts-ignore
import { resolvers } from '../schema/resolvers';

export const createFastifyServer = async () => {
  const executableSchema = makeExecutableSchema({
    inheritResolversFromInterfaces: true,
    // @ts-ignore
    resolvers,
    resolverValidationOptions: { requireResolversForResolveType: 'ignore' },
    typeDefs: importSchema(path.resolve(__dirname, '../schema/schema.graphql')),
  });

  const app = fastify();

  const graphQLServer = new ApolloServer({
    context: ({ request, reply }) => ({
      reply,
      request,
    }),
    schema: executableSchema,
  });

  await graphQLServer.start();

  void app.register(graphQLServer.createHandler());

  return app;
};
