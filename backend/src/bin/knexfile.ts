if (!process.env.POSTGRES_CONNECTION_STRING) {
  throw new Error(
    'Must provide a PG connection string (export POSTGRES_CONNECTION_STRING=value) -- if you need a fresh database, we recommend using Render.com',
  );
}

export default {
  client: "pg",
  connection: process.env.POSTGRES_CONNECTION_STRING,
  migrations: {
    directory: __dirname + '/migrations',
    loadExtensions: ['.ts'],
    extension: 'ts'
  }
};
