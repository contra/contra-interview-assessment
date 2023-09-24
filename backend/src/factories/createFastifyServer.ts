import path from 'path';
import fastify from 'fastify';
import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from '@graphql-tools/schema';
import type { DatabasePoolType } from 'slonik';
// @ts-ignore
import { resolvers } from '../schema/resolvers';
import {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  sendResult,
  shouldRenderGraphiQL,
} from 'graphql-helix';
import { Logger } from 'roarr';

export const createFastifyServer = async (
  pool: DatabasePoolType,
  logger: Logger,
) => {
  const executableSchema = makeExecutableSchema({
    inheritResolversFromInterfaces: true,
    resolvers,
    resolverValidationOptions: { requireResolversForResolveType: 'ignore' },
    typeDefs: importSchema(path.resolve(__dirname, '../schema/schema.graphql')),
  });

  const app = fastify();

  app.route({
    method: ['GET', 'POST'],
    url: '/graphql',
    async handler(req, res) {
      const request = {
        body: req.body,
        headers: req.headers,
        method: req.method,
        query: req.query,
      };

      if (shouldRenderGraphiQL(request)) {
        res.type('text/html');
        res.send(renderGraphiQL({}));
      } else {
        const { operationName, query, variables } = getGraphQLParameters(
          request,
        );
        const result = await processRequest({
          operationName,
          query,
          variables,
          request,
          schema: executableSchema,
          contextFactory: () => ({
            pool,
            log: logger,
          }),
        });
        sendResult(result, res.raw);
      }
    },
  });

  return app;
};
