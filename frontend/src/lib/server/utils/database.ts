import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User, Project } from '@/lib/server/entities';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'dpg-cbffjdkgqg40k6cf7gv0-a.oregon-postgres.render.com',
  port: 5432,
  username: 'nextjs_graphql_user',
  password: 'HTmGZAdxiOqtsD10XwLwhsLJ2XQE0KWG',
  database: 'nextjs_graphql',
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  entities: [User, Project],
  migrations: [],
  subscribers: [],
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

try {
  await AppDataSource.initialize();
} catch (err) {
  console.error('Error during Data Source initialization', err);
}
