// eslint-disable-next-line import/no-unassigned-import
import "reflect-metadata";
import { PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server-fastify';
import fastify from 'fastify';
import { buildSchemaSync } from "type-graphql";
import { SampleResolver } from '../schema/resolvers/sampleResolver';

export const createFastifyServer = async (pool: PrismaClient) => {
  const schema = buildSchemaSync({
    resolvers: [SampleResolver]
  })

  const app = fastify();

  const graphQLServer = new ApolloServer({
    context: ({ request, reply }) => ({
      pool,
      reply,
      request,
    }),
    schema,
  });

  await graphQLServer.start();

  void app.register(graphQLServer.createHandler());

  return app;
};
