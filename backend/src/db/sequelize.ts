import {Options, Sequelize} from 'sequelize'
import {connectionBuilder} from "./config";

const config = connectionBuilder() as Options;
const sequelizeConnection = new Sequelize(config);

export default sequelizeConnection
