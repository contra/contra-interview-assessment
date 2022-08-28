import dotenv from 'dotenv';
import Logger from 'roarr';
import {connect} from "../db";
import {createFastifyServer} from "./fastify";

dotenv.config();
const log = Logger.child({ context: 'bin/server' });

(async () => {
  try {
    await connect();

    const app = await createFastifyServer();

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
