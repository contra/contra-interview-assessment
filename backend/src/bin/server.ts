import Logger from 'roarr';
import { createFastifyServer } from '../factories/createFastifyServer';
import { connect } from '../sequelize';

const log = Logger.child({ context: 'bin/server' });

(async () => {
  try {
    await connect();

    const app = await createFastifyServer();

    app.listen(8_080, () =>
      log.info(`🛩 Server ready at http://localhost:8080/graphql`),
    );
  } catch (error) {
    log.error(error.message);
  }
})();
