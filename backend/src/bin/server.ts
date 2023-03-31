import { createFastifyServer } from '../factories/createFastifyServer';
import logger from '../utils/logger/logger';
import { connect } from '../utils/sequelize';

(async () => {
  try {
    await connect();

    const app = await createFastifyServer();

    app.listen(8_080, () =>
      logger.info(`🛩 Server ready at http://localhost:8080/graphql`),
    );
  } catch (error) {
    logger.error(error.message);
  }
})();
