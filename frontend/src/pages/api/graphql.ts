import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-micro';
import { PageConfig } from 'next';
import { buildSchema } from 'type-graphql';
import MicroCors from 'micro-cors';

import { createContext } from '@/lib/server/utils/createContext';
import { ProjectResolver, UserResolver } from '@/lib/server/graphql/resolvers';

const cors = MicroCors();

const schema = await buildSchema({
  resolvers: [ProjectResolver, UserResolver],
});

const server = new ApolloServer({
  schema,
  context: createContext,
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
