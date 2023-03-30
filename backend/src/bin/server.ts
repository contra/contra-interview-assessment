import { createFastifyServer } from '../factories/createFastifyServer';
import { connect } from '../sequelize';
import logger from '../utils/logger';

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
