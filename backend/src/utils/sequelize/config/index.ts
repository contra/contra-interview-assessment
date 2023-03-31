import { configConstants } from './configConstants';

const getConnectionInfo = () => JSON.parse(process.env.DB_CONFIG as string);

export const connectionBuilder = () => {
  const connectionInfo = getConnectionInfo();

  return {
    define: {
      timestamps: false,
    },
    dialect: configConstants.POSTGRES_DIALECT,

    ...connectionInfo,
    pool: {
      idle: configConstants.ONE_SECOND,
      max: configConstants.MAX_CONNECTIONS,
      min: configConstants.MIN_CONNECTIONS,
    },
  };
};
