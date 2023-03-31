const { env } = process;

module.exports = {
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  host: env.DB_HOST,
  port: 5432,
  dialect: 'postgres',
  migrationStorage: 'sequelize',
  seederStorage: 'sequelize',
  logging: console,
};
