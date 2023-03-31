import { Sequelize } from 'sequelize';

export type ResolverContext = {
  db: Sequelize;
};
