require('dotenv').config();
import { runServer } from './runServer';

(async () => {
  try {
    await runServer();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
})();
