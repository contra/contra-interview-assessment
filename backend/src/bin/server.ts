import Logger from 'roarr';
import { createFastifyServer } from '../factories/createFastifyServer';

const log = Logger.child({ context: 'bin/server' });

if (!process.env.POSTGRES_CONNECTION_STRING)
  throw new Error(
    'Must provide a PG connection string (export POSTGRES_CONNECTION_STRING=value) -- if you need a fresh database, we recommend using Render.com',
  );

export const createServerInstance = async () => {
  try {
    const app = await createFastifyServer();

    app.listen(8_080, () =>
      log.info(`🛩 Server ready at http://localhost:8080/graphql`),
    );
    return app;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return null;
  }
};
createServerInstance();
