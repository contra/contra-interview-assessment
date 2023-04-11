import Logger from 'roarr';
import { PrismaClient } from '@prisma/client';
// @ts-expect-error
import { createInterceptors } from 'slonik-interceptor-preset';
import { createFastifyServer } from '../factories/createFastifyServer';

const log = Logger.child({ context: 'bin/server' });
const prisma = new PrismaClient();

if (!process.env.POSTGRES_CONNECTION_STRING)
  throw new Error(
    'Must provide a PG connection string (export POSTGRES_CONNECTION_STRING=value) -- if you need a fresh database, we recommend using Render.com',
  );

(async () => {
  try {
    const app = await createFastifyServer(prisma);

    app.listen(8_080, () =>
      log.info(`🛩 Server ready at http://localhost:8080/graphql`),
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
})();
