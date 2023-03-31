const { env } = process;

module.exports = {
  ...JSON.parse(process.env.DB_CONFIG),
  port: 5432,
  dialect: 'postgres',
  migrationStorage: 'sequelize',
  seederStorage: 'sequelize',
  logging: console,
};
