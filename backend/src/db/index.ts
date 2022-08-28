import Logger from "roarr";
import sequelizeConnection from "./sequelize";

const log = Logger.child({ context: 'bin/server' });

export const connect = async  () => {
    try{
        await sequelizeConnection.authenticate();
        log.debug('Connected to Postgres DB');
    } catch (error) {
        log.error('Error connecting to DB', error.message);
        throw new Error(error.message)
    }

}

export const disconnect = async  () => {
    try{
        await sequelizeConnection.close();
        log.debug('Disconnected from Postgres DB');
    } catch (error) {
        log.error('Error disconnecting from DB', error.message);
        throw new Error(error.message)
    }

}

export const getModels = () => sequelizeConnection.models;