import { ApolloServer } from 'apollo-server-fastify';
import fastify from 'fastify';
import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';
import path from 'path';

// @ts-ignore
import { resolvers } from '../schema/resolvers';
import { createContext } from '../ResolverContext';

export const createFastifyServer = async () => {
  const executableSchema = makeExecutableSchema({
    inheritResolversFromInterfaces: true,
    resolvers,
    resolverValidationOptions: { requireResolversForResolveType: 'ignore' },
    typeDefs: importSchema(path.resolve(__dirname, '../schema/schema.graphql')),
  });
  const app = fastify();

  const graphQLServer = new ApolloServer({
    context: createContext,
    schema: executableSchema,
  });

  await graphQLServer.start();

  void app.register(graphQLServer.createHandler());

  return app;
};
