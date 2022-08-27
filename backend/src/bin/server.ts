import dotenv from 'dotenv';
import Logger from 'roarr';
import { createPool } from 'slonik';
// @ts-expect-error
import { createInterceptors } from 'slonik-interceptor-preset';
import { createFastifyServer } from '../factories/createFastifyServer';

dotenv.config();
const log = Logger.child({ context: 'bin/server' });

if (!process.env.POSTGRES_CONNECTION_STRING)
  throw new Error(
    'Must provide a PG connection string (export POSTGRES_CONNECTION_STRING=value) -- if you need a fresh database, we recommend using Render.com',
  );

const pool = createPool(process.env.POSTGRES_CONNECTION_STRING, {
  captureStackTrace: false,
  connectionTimeout: 60 * 1_000,
  interceptors: createInterceptors(),
});

(async () => {
  try {
    const app = await createFastifyServer(pool);

    app.listen({ host: '0.0.0.0', port: 4_000 },(error, add) => {
      if (error) {
        log.error(error.message);
        throw error;
      }
      log.info(`Server listening on '${add}' ...`);
    });
  } catch (error) {
    log.error(error.message);
    throw error;
  }
})();
