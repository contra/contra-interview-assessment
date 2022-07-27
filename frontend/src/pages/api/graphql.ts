import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-micro';
import { PageConfig } from 'next';
import { buildSchema } from 'type-graphql';
import MicroCors from 'micro-cors';

import { ProjectResolver, UserResolver } from '@/lib/server/graphql/resolvers';

const cors = MicroCors({
  origin: 'https://studio.apollographql.com',
  allowMethods: ['GET', 'POST'],
  allowHeaders: [
    'Access-Control-Allow-Credentials',
    'true',
    'Content-Type',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Headers',
  ],
});

const schema = await buildSchema({
  resolvers: [ProjectResolver, UserResolver],
});

const server = new ApolloServer({
  schema,
});

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

const startServer = server.start();

export default cors(async function handler(req: any, res: any) {
  if (req.method === 'OPTIONS') {
    res.end();
  }

  await startServer;
  await server.createHandler({ path: '/api/graphql' })(req, res);
});
