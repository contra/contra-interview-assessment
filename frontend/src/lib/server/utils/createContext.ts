import { DataSource } from 'typeorm';
import { AppDataSource } from './database';

export type IContext = {
  dataSource: DataSource;
};

export async function createContext(): Promise<IContext> {
  const dataSource = AppDataSource;

  return {
    dataSource,
  };
}
