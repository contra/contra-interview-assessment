import logger from '../logger/logger';
import sequelizeConnection from './connection';

export const disconnect = async () => {
  try {
    await sequelizeConnection.close();
    logger.debug('Disconnected from Postgres DB');
  } catch (error) {
    logger.error('Error disconnecting from DB', error.message);
    throw new Error(error.message);
  }
};

export const connect = async () => {
  try {
    await sequelizeConnection.authenticate();
    logger.debug('Connected to Postgres DB');
  } catch (error) {
    logger.error('Error connecting to DB', error.message);
    throw new Error(error.message);
  }
};
