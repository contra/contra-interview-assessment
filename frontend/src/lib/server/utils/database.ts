import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User, Project } from '@/lib/server/entities';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'ec2-52-204-157-26.compute-1.amazonaws.com',
  port: 5432,
  username: 'ynxbrdwythcvpa',
  password: '27cf5bcf35896a0396ecbf2b07756295db00b7f50517e18edfa3c0d267f06168',
  database: 'd3ocdsiddrmvsv',
  synchronize: process.env.NODE_ENV === 'development',
  logging: false,
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
