import { mergeResolvers } from 'graphql-tools';
import { Mutation } from './Mutations';
import { Query, UserAccount } from './Queries';

export const resolvers = mergeResolvers([
  {
    Mutation,
    Query,
    UserAccount,
  },
]);
