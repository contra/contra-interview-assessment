const { env } = process;
console.log(env.DB_CONNECTION)

const {username, password, host, port, database} = JSON.parse(env.DB_CONNECTION)
console.log(username)
module.exports = {
  username: username,
  password: password,
  database: database,
  host: host,
  port: port,
  dialect: 'postgres',
  migrationStorage: 'sequelize',
  seederStorage: 'sequelize',
  logging: console,
};
