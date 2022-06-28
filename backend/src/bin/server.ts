import Logger from 'roarr';
import { createPool } from 'slonik';
// @ts-expect-error
import { createInterceptors } from 'slonik-interceptor-preset';
import { createCustomSlonikInterceptors } from '../factories/createCustomSlonikInterceptors';
import { createFastifyServer } from '../factories/createFastifyServer';

const log = Logger.child({ context: 'bin/server' });

if (!process.env.POSTGRES_CONNECTION_STING)
  throw new Error(
    'Must provide a PG connection string -- if you need a fresh database, we recommend using Render',
  );

const pool = createPool(process.env.POSTGRES_CONNECTION_STING, {
  captureStackTrace: false,
  connectionTimeout: 60 * 1_000,
  interceptors: [...createInterceptors(), ...createCustomSlonikInterceptors()],
});

(async () => {
  try {
    const app = await createFastifyServer(pool);

    app.listen(8_080, () =>
      log.info(`🛩 Server ready at http://localhost:8080/graphql`),
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
})();
