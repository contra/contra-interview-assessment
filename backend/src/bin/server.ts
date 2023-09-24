import { Roarr } from 'roarr';
import { createPool } from 'slonik';
// @ts-expect-error
import { createInterceptors } from 'slonik-interceptor-preset';
import { getPgConfig } from '../config/databaseConfiguration';
import { createFastifyServer } from '../factories/createFastifyServer';

const log = Roarr.child({ context: 'bin/server' });

const { connectionString } = getPgConfig();

const pool = createPool(connectionString, {
  captureStackTrace: false,
  connectionTimeout: 60 * 1_000,
  interceptors: createInterceptors(),
});

(async () => {
  try {
    const app = await createFastifyServer(pool, log);

    app.listen(5000, () => {
      log.info(`🛩 Server ready at http://localhost:5000/graphql`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
})();
