import { mergeResolvers } from 'graphql-tools';
import { Mutation } from './Mutations';
import { Query, User } from './Queries';

export const resolvers = mergeResolvers([
  {
    Mutation,
    Query,
    User,
  },
]);
